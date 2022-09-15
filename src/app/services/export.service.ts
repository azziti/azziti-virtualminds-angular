import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { Caisse } from '../models/caisse';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  constructor() {}

  // generate a csv file and download it
  csvDownload(data: Caisse[], headers: any) {
    if (!data || !data.length) {
      return;
    }
    const separator = ',';
    const csvContent: any =
      "libellé,recettes,dépenses,date d'opération,solde" +
      '\n' +
      data
        .map((row: any) => {
          // console.log(row)
          return headers
            .map((header: any) => {
              return row[header] === null || row[header] === undefined
                ? ''
                : header === 'operationDate'
                ? row[header].toISOString().substring(0, 10)
                : row[header];
            })
            .join(separator);
        })
        .join('\n');

    console.log(csvContent);

    this.exportFile(csvContent, 'text/csv');
  }

  // export csf file to client
  exportFile(data: any, fileType: any) {
    const blob = new Blob([data], { type: fileType });
    FileSaver.saveAs(blob, 'download CSV');
  }
}
