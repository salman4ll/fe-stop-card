import React from 'react';
import * as XLSX from 'sheetjs-style';
import FileSaver from 'file-saver';

const ExportExcel = ({ excelData, fileName, title }: { excelData: any; fileName: any; title: string }) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToExcel = () => {
        // Define the header row
        const keys = Object.keys(excelData[0]);
        const headerRow = keys.map(key => key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' '));

        // Create an array of arrays (aoa) for the data
        const aoa = [
            [title], // Use the title prop here
            headerRow,
            ...excelData.map((obj: any) => keys.map(key => obj[key]))
        ];

        // Create worksheet from the aoa
        const ws = XLSX.utils.aoa_to_sheet(aoa);

        // Style the first row (title)
        ws['A1'].s = {
            font: { bold: true, color: { rgb: '000000' } },
            fill: { fgColor: { rgb: '00FFFF' } },
            alignment: { horizontal: 'center' },
            border: { top: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } }
        };

        // Merge the first row (title)
        ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: headerRow.length - 1 } }];

        // Style headers to be bold and add border to headers
        headerRow.forEach((header, index) => {
            const cellAddress = XLSX.utils.encode_cell({ r: 1, c: index });
            ws[cellAddress].s = {
                font: { bold: true },
                border: { top: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } }
            };
        });

        // Add border to data cells
        excelData.forEach((row: any, rowIndex: any) => {
            keys.forEach((key, colIndex) => {
                const cellAddress = XLSX.utils.encode_cell({ r: rowIndex + 2, c: colIndex });
                if (!ws[cellAddress]) ws[cellAddress] = {}; // Initialize cell if it doesn't exist
                ws[cellAddress].s = {
                    border: { top: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } }
                };
            });
        });

        // Calculate the maximum width for each column
        const maxLengths = headerRow.map((header, colIndex) => {
            const headerLength = header.length;
            const columnDataLengths = excelData.map((row: any) => (row[keys[colIndex]] ? row[keys[colIndex]].toString().length : 0));
            return Math.max(headerLength, ...columnDataLengths);
        });

        ws['!cols'] = maxLengths.map(length => ({ wch: length + 2 })); // Adjust column width

        // Check if title exceeds 31 characters, if so, truncate it
        const sheetName = title.length > 31 ? title.slice(0, 31) : title;

        // Create the workbook and add the worksheet
        const wb = { Sheets: { [sheetName]: ws }, SheetNames: [sheetName] }; // Use the sheetName here
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    };

    return (
        <button className='btn' onClick={exportToExcel}>
            Export to Excel
        </button>
    );
};

export default ExportExcel;
