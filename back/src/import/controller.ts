import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { XlxsParserService } from './xlxs-parser.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { OpenAIService } from '../openai.service';

export class JiraRow {
  Resumen: string;
  'Clave de incidencia': string;
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
  async importJiraCSV(@UploadedFile() file: Express.Multer.File) {
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
}