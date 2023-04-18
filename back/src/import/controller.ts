import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { XlxsParserService } from './xlxs-parser.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { OpenAIService } from '../openai.service';

export class JiraRow {
  Resumen: string;
  'Clave de incidencia': string;
  'Tipo de incidencia': string;
  Prioridad: string;
  Responsable: string;
  Descripcion: string;
  Estado: string;
}

@Controller('import')
export class ImportController {
  constructor(
  private xlxs: XlxsParserService,
  private openAIService: OpenAIService
  ) {}

  @Post('assign-tasks')
  @UseInterceptors(FileInterceptor('file'))
  async assignTasks(@UploadedFile() file: Express.Multer.File) {
    try {
      const jiraFileRows = this.xlxs.parse<JiraRow>(file);
      
      const doneTasksGroupByResponsable: Record<string, JiraRow[]> = {}
      const toDoTasks: JiraRow[] = [];

      for (const jiraFileRow of jiraFileRows) {
        if (jiraFileRow['Estado'] ==  "Listo") {
          const responsable = jiraFileRow['Responsable'];

          doneTasksGroupByResponsable[responsable] = [...(doneTasksGroupByResponsable[responsable] || []), jiraFileRow]
        } 
        
        if (jiraFileRow['Estado'] == "Para hacer") {
          toDoTasks.push(jiraFileRow);
        }
      }

      let initialText = "Te voy a copiar la informacion de un tablero de Jira en donde se le asignan a los distintos desarrolladores de una empresa las distintas tareas. Cada tarea tiene una clave, resumen y descripción.  La idea es que yo te pase todos los desarrolladores de la empresa con las tareas que realizó y la información de cada tarea. Por cada desarrollador te voy a pedir que hagas una lista con sus tareas y palabras claves sobre lo que estuvo trabajando. Después de que ya conozcas a cada desarrollador y las tareas que realizó, te voy a mandar nuevas tareas que se deben realizar y quiero que me asignes un desarrollador en base a sus capacidades y las tareas que ya realizó.";

      let secondText = "Ahora te voy a pasar todos los desarrolladores y las tareas que ya realizó. La idea es que hagas una lista con sus tareas y palabras claves sobre lo que estuvo trabajando. Los desarrolladores son:";
      for (const [responsable, jiraRows] of Object.entries(doneTasksGroupByResponsable)) {
        let responsableTasksText = `El desarrollador ${responsable} se encargó de hacer las siguientes tareas: `;
        for (const jiraRow of jiraRows) {
          let taskText = `La tarea con clave ${jiraRow['Clave de incidencia']}, resumen ${jiraRow['Resumen']} y descripción ${jiraRow['Descripcion']}`;
          responsableTasksText = responsableTasksText.concat(taskText);
        }
        secondText = secondText.concat(responsableTasksText)
      }

      let thirdText = "Ahora que ya aprendiste sobre los distintos desarrolladores disponibles, tengo nuevas tareas para hacer, ¿me podrías asignar un desarrollador a cada una? Cada tarea tiene una clave, resumen y descripción. Por cada una necesito que me asignes unos de los desarrolladores anteriores en base al resumen de cada tarea que ya realizó. Las tareas a realizar son las siguientes:"
      for (const toDoTask of toDoTasks) {
        let textTaskToDo = `La tarea con clave ${toDoTask['Clave de incidencia']}, resumen ${toDoTask['Resumen']} y descripción ${toDoTask['Descripcion']}`
        thirdText = thirdText.concat(textTaskToDo);
      }

      const res1 = await this.openAIService.sendMessage(initialText);
      const chatId1 = res1.parentMessageId;

      const res2 = await this.openAIService.sendMessage(secondText, chatId1);
      const chatId2 = res2.parentMessageId;

      const finalRes = await this.openAIService.sendMessage(thirdText, chatId2);

      return finalRes;
      
    } catch (error) {
      throw error;
    }
  }

  @Post('create-tasks')
  @UseInterceptors(FileInterceptor('file'))
  async createEpics(@UploadedFile() file: Express.Multer.File, description: string) {
    try {
      const jiraFileRows = this.xlxs.parse<JiraRow>(file);
  
      let initialText = `En base siguiente descripción de una empresa: ${description}. Te voy a copiar la informacion del tablero de Jira de esta misma empresa en donde hay distintas tareas que están siendo desarrolladas. Cada tarea tiene una clave, resumen y descripción. La idea es que en base a la descripción que te mandé y las tareas que suele desarrollar esta empresa, te voy a pedir que listes nuevas tareas que esta empersa pueda realizar para aportar un valor de negocio. Después de enviarte la lista de tareas, te pediré una lista de nuevas posibles tareas con su resumen.`;

      let secondText = "Ahora te voy a pasar la lista de todas las tareas que realiza la empresa. La idea es que hagas una lista con nuevas posibles tareas que puede llevar a cabo la empresa para aportar valor de negocio y te bases en la descripción de la empresa que te mande anteriorimente y la lista de todas las tareas que te voy a pasar ahora. Necesito que me listes estas posibles nuevas tareas con su resumen. Las tareas que ya desarrolló la empresa son:";
      for (const jiraRow of jiraFileRows) {
        let taskText = `La tarea con clave ${jiraRow['Clave de incidencia']}, resumen ${jiraRow['Resumen']} y descripción ${jiraRow['Descripcion']}`;
        secondText = secondText.concat(taskText);
      }

      console.log(initialText);
      const res1 = await this.openAIService.sendMessage(initialText);
      console.log(res1);
      const chatId1 = res1.parentMessageId;

      const finalRes = await this.openAIService.sendMessage(secondText, chatId1);
    
      return finalRes;
    } catch (error) {
      throw error;
    }
  }
}