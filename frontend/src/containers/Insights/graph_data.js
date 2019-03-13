import indiarawData from './india_raw.json';
import denmarkRawData from './denmark_raw.json';
import brazilRawData from './brazil_raw.json';
import usaRawData from './usa_raw.json';
import japanRawData from './japan_raw.json';
import australiaRawData from './australia_raw.json';
import indiaRawDataImport from './india_raw_import.json';
import denmarkRawDataImport from './denmark_raw_import.json';
import brazilRawDataImport from './brazil_raw_import.json';
import usaRawDataImport from './usa_raw_import.json';
import japanRawDataImport from './japan_raw_import.json';
import australiaRawDataImport from './australia_raw_import.json';


import usaDataExportVehiclesRaw from './vehicles_us_export.json';
import usaDataImportVehiclesRaw from './vehicles_us_export.json';
import usaDataExportPaperRaw from './paper_us_export.json';
import usaDataImportPaperRaw from './paper_us_export.json';
import usaDataExportMeatRaw from './meat_us_export.json';
import usaDataImportMeatRaw from './meat_us_export.json';

import moment from 'moment';

let indiaArrayData   = [] , 
    denmarkArrayData = [] , 
    brazilArrayData  = [] , 
    usaArrayData     = [] , 
    japanArrayData   = [], 
    indiaArrayDataImport = [],
    denmarkArrayDataImport = [],
    brazilArrayDataImport = [],
    usaArrayDataImport = [],
    japanArrayDataImport = [],
    usaDataExportVehiclesArray = [],
    usaDataImportVehiclesArray = [],
    usaDataExportPaperArray = [], 
    usaDataImportPaperArray = [],
    usaDataExportMeatArray = [],
    usaDataImportMeatArray = [];

let pick_month = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const width = '100%';
const height = '250px';

indiarawData.map(function(each){
  let itemA = [];
  //itemA[0] = moment(new Date());
  itemA[0] = each.Time_Period.split('-')[0]+','+pick_month[parseInt(each.Time_Period.split('-')[1],10)]
  itemA[1] = each.Actual;
   if(each.Actual == ''){
    itemA[1] = null;
  }

  itemA[2] = each.Forecast ;
  if(each.Forecast == ''){
    itemA[2] = null;
  }
  
  indiaArrayData.push(itemA)
})
denmarkRawData.map(function(each){
  let itemA = [];
  //itemA[0] = moment(new Date());
  itemA[0] = each.Time_Period.split('-')[0]+','+pick_month[parseInt(each.Time_Period.split('-')[1],10)]
  itemA[1] = each.Actual;
   if(each.Actual == ''){
    itemA[1] = null;
  }

  itemA[2] = each.Forecast ;
  if(each.Forecast == ''){
    itemA[2] = null;
  }
  
  denmarkArrayData.push(itemA)
})
brazilRawData.map(function(each){
  let itemA = [];
  //itemA[0] = moment(new Date());
  itemA[0] = each.Time_Period.split('-')[0]+','+pick_month[parseInt(each.Time_Period.split('-')[1],10)]
  itemA[1] = each.Actual;
   if(each.Actual == ''){
    itemA[1] = null;
  }

  itemA[2] = each.Forecast ;
  if(each.Forecast == ''){
    itemA[2] = null;
  }
  
  brazilArrayData.push(itemA)
})
usaRawData.map(function(each){
  let itemA = [];
  //itemA[0] = moment(new Date());
  itemA[0] = each.Time_Period.split('-')[0]+','+pick_month[parseInt(each.Time_Period.split('-')[1],10)]
  itemA[1] = each.Actual;
   if(each.Actual == ''){
    itemA[1] = null;
  }

  itemA[2] = each.Forecast ;
  if(each.Forecast == ''){
    itemA[2] = null;
  }
  
  usaArrayData.push(itemA)
})
japanRawData.map(function(each){
  let itemA = [];
  //itemA[0] = moment(new Date());
  itemA[0] = each.Time_Period.split('-')[0]+','+pick_month[parseInt(each.Time_Period.split('-')[1],10)]
  itemA[1] = each.Actual;
   if(each.Actual == ''){
    itemA[1] = null;
  }

  itemA[2] = each.Forecast ;
  if(each.Forecast == ''){
    itemA[2] = null;
  }
  
  japanArrayData.push(itemA)
})
indiaRawDataImport.map(function(each){
  let itemA = [];
  //itemA[0] = moment(new Date());
  itemA[0] = each.Time_Period.split('-')[0]+','+pick_month[parseInt(each.Time_Period.split('-')[1],10)]
  itemA[1] = each.Actual;
   if(each.Actual == ''){
    itemA[1] = null;
  }

  itemA[2] = each.Forecast ;
  if(each.Forecast == ''){
    itemA[2] = null;
  }
  indiaArrayDataImport.push(itemA)
})
denmarkRawDataImport.map(function(each){
  let itemA = [];
  //itemA[0] = moment(new Date());
  itemA[0] = each.Time_Period.split('-')[0]+','+pick_month[parseInt(each.Time_Period.split('-')[1],10)]
  itemA[1] = each.Actual;
   if(each.Actual == ''){
    itemA[1] = null;
  }

  itemA[2] = each.Forecast ;
  if(each.Forecast == ''){
    itemA[2] = null;
  }
  denmarkArrayDataImport.push(itemA)
})
brazilRawDataImport.map(function(each){
  let itemA = [];
  //itemA[0] = moment(new Date());
  itemA[0] = each.Time_Period.split('-')[0]+','+pick_month[parseInt(each.Time_Period.split('-')[1],10)]
  itemA[1] = each.Actual;
   if(each.Actual == ''){
    itemA[1] = null;
  }

  itemA[2] = each.Forecast ;
  if(each.Forecast == ''){
    itemA[2] = null;
  }
  brazilArrayDataImport.push(itemA)
})
usaRawDataImport.map(function(each){
  let itemA = [];
  //itemA[0] = moment(new Date());
  itemA[0] = each.Time_Period.split('-')[0]+','+pick_month[parseInt(each.Time_Period.split('-')[1],10)]
  itemA[1] = each.Actual;
   if(each.Actual == ''){
    itemA[1] = null;
  }

  itemA[2] = each.Forecast ;
  if(each.Forecast == ''){
    itemA[2] = null;
  }
  usaArrayDataImport.push(itemA)
})
japanRawDataImport.map(function(each){
  let itemA = [];
  //itemA[0] = moment(new Date());
  itemA[0] = each.Time_Period.split('-')[0]+','+pick_month[parseInt(each.Time_Period.split('-')[1],10)]
  itemA[1] = each.Actual;
   if(each.Actual == ''){
    itemA[1] = null;
  }

  itemA[2] = each.Forecast ;
  if(each.Forecast == ''){
    itemA[2] = null;
  }
  japanArrayDataImport.push(itemA)
})

usaDataExportVehiclesRaw.map(function(each){
  let itemA = [];
  //itemA[0] = moment(new Date());
  itemA[0] = each.Time_Period.split('-')[0]+','+pick_month[parseInt(each.Time_Period.split('-')[1],10)]
  itemA[1] = each.Actual;
   if(each.Actual == ''){
    itemA[1] = null;
  }

  itemA[2] = each.Forecast ;
  if(each.Forecast == ''){
    itemA[2] = null;
  }
  usaDataExportVehiclesArray.push(itemA)
})
usaDataImportVehiclesRaw.map(function(each){
  let itemA = [];
  //itemA[0] = moment(new Date());
  itemA[0] = each.Time_Period.split('-')[0]+','+pick_month[parseInt(each.Time_Period.split('-')[1],10)]
  itemA[1] = each.Actual;
   if(each.Actual == ''){
    itemA[1] = null;
  }

  itemA[2] = each.Forecast ;
  if(each.Forecast == ''){
    itemA[2] = null;
  }
  usaDataImportVehiclesArray.push(itemA)
})
usaDataExportPaperRaw.map(function(each){
  let itemA = [];
  //itemA[0] = moment(new Date());
  itemA[0] = each.Time_Period.split('-')[0]+','+pick_month[parseInt(each.Time_Period.split('-')[1],10)]
  itemA[1] = each.Actual;
   if(each.Actual == ''){
    itemA[1] = null;
  }

  itemA[2] = each.Forecast ;
  if(each.Forecast == ''){
    itemA[2] = null;
  }
  usaDataExportPaperArray.push(itemA)
})
usaDataImportPaperRaw.map(function(each){
  let itemA = [];
  //itemA[0] = moment(new Date());
  itemA[0] = each.Time_Period.split('-')[0]+','+pick_month[parseInt(each.Time_Period.split('-')[1],10)]
  itemA[1] = each.Actual;
   if(each.Actual == ''){
    itemA[1] = null;
  }

  itemA[2] = each.Forecast ;
  if(each.Forecast == ''){
    itemA[2] = null;
  }
  usaDataImportPaperArray.push(itemA)
})
usaDataExportMeatRaw.map(function(each){
  let itemA = [];
  //itemA[0] = moment(new Date());
  itemA[0] = each.Time_Period.split('-')[0]+','+pick_month[parseInt(each.Time_Period.split('-')[1],10)]
  itemA[1] = each.Actual;
   if(each.Actual == ''){
    itemA[1] = null;
  }

  itemA[2] = each.Forecast ;
  if(each.Forecast == ''){
    itemA[2] = null;
  }
  usaDataExportMeatArray.push(itemA)
})
usaDataImportMeatRaw.map(function(each){
  let itemA = [];
  //itemA[0] = moment(new Date());
  itemA[0] = each.Time_Period.split('-')[0]+','+pick_month[parseInt(each.Time_Period.split('-')[1],10)]
  itemA[1] = each.Actual;
   if(each.Actual == ''){
    itemA[1] = null;
  }

  itemA[2] = each.Forecast ;
  if(each.Forecast == ''){
    itemA[2] = null;
  }
  usaDataImportMeatArray.push(itemA)
})


let importExportcolumns = [
    {
      label: 'Year',
      type: 'string',
    },
    {
      label: 'Actuals',
      type: 'number',
    },
    {
      label: 'Forecast',
      type: 'number',
    },
];



function makeImportExportOptions(type,country){
  let title = country +' '+ type + '(in billion U.S. dollars)';
  let importExportOptions = {
    legend: {
      textStyle: {
        color: '#788195',
      },
    },
    hAxis: {
      textStyle: {
        color: '#788195',
        fontSize: 10,
      },
      title: '',
      titleTextStyle: {
        color: '#788195',
        fontSize: 10,
      },
      gridlines:{
        color: '#333', 
        count: 10,
      },
    },
    vAxis: {
      textStyle: {
        color: '#788195',
        fontSize: 10,
      },
      title: title,
      titleTextStyle: {
        color: '#788195',
      },
       gridlines:{
        color: '#333', 
      },
    },
    colors: ['#FF9933','#138808'],
    dataOpacity: 1.0,
    animation: {
      duration: 1000,
      easing: 'in',
      startup: true,
    },
    tooltip: {
      textStyle: {
        color: '#788195',
      },
    },
  }
  return importExportOptions;
}

const indiaDataExport = {
  title: 'Line Chart',
  chartType: 'LineChart',
  key: 'indiaChartExport',
  width,
  height,
  columns: importExportcolumns,
  rows: indiaArrayData,
  options: makeImportExportOptions('Export','India'),
};

const denmarkDataExport = {
  title: 'Line Chart',
  chartType: 'LineChart',
  key: 'denmarkChartExport',
  width,
  height,
  columns: importExportcolumns,
  rows: denmarkArrayData,
  options: makeImportExportOptions('Export','Denmark'),
};

const brazilDataExport = {
  title: 'Line Chart',
  chartType: 'LineChart',
  key: 'brazilChartExport',
  width,
  height,
  columns: importExportcolumns,
  rows: brazilArrayData,
  options: makeImportExportOptions('Export','Brazil'),
};

const usaDataExport = {
  title: 'Line Chart',
  chartType: 'LineChart',
  key: 'usaChartExport',
  width,
  height,
  columns: importExportcolumns,
  rows: usaArrayData,
  options: makeImportExportOptions('Export','USA'),
};

const japanDataExport = {
  title: 'Line Chart',
  chartType: 'LineChart',
  key: 'japanChartExport',
  width,
  height,
  columns: importExportcolumns,
  rows: japanArrayData,
  options: makeImportExportOptions('Export','Japan'),
};

const indiaDataImport = {
  title: 'Line Chart',
  chartType: 'LineChart',
  key: 'indiaChartImport',
  width,
  height,
  columns: importExportcolumns,
  rows: indiaArrayDataImport,
  options: makeImportExportOptions('Import','India'),
};

const denmarkDataImport = {
  title: 'Line Chart',
  chartType: 'LineChart',
  key: 'denmarkChartImport',
  width,
  height,
  columns: importExportcolumns,
  rows: denmarkArrayDataImport,
  options: makeImportExportOptions('Import','Denmark'),
};

const brazilDataImport = {
  title: 'Line Chart',
  chartType: 'LineChart',
  key: 'brazilChartImport',
  width,
  height,
  columns: importExportcolumns,
  rows: brazilArrayDataImport,
  options: makeImportExportOptions('Import','Brazil'),
};

const usaDataImport = {
  title: 'Line Chart',
  chartType: 'LineChart',
  key: 'usaChartImport',
  width,
  height,
  columns: importExportcolumns,
  rows: usaArrayDataImport,
  options: makeImportExportOptions('Import','USA'),
};

const japanDataImport = {
  title: 'Line Chart',
  chartType: 'LineChart',
  key: 'japanChartImport',
  width,
  height,
  columns: importExportcolumns,
  rows: japanArrayDataImport,
  options: makeImportExportOptions('Import','Japan'),
};

const usaDataExportVehicles = {
  title: 'Line Chart',
  chartType: 'LineChart',
  key: 'usaDataExportVehicles',
  width,
  height,
  columns: importExportcolumns,
  rows: usaDataExportVehiclesArray,
  options: makeImportExportOptions('Export','USA Vehicles'),
};

const usaDataImportVehicles = {
  title: 'Line Chart',
  chartType: 'LineChart',
  key: 'usaDataImportVehicles',
  width,
  height,
  columns: importExportcolumns,
  rows: usaDataImportVehiclesArray,
  options:  makeImportExportOptions('Export','USA Meat'),
};

const usaDataExportPaper = {
  title: 'Line Chart',
  chartType: 'LineChart',
  key: 'usaDataExportPaper',
  width,
  height,
  columns: importExportcolumns,
  rows: usaDataExportPaperArray,
  options: makeImportExportOptions('Export','USA Paper'),
};

const usaDataImportPaper = {
  title: 'Line Chart',
  chartType: 'LineChart',
  key: 'usaDataImportPaper',
  width,
  height,
  columns: importExportcolumns,
  rows: usaDataImportPaperArray,
  options:  makeImportExportOptions('Export','USA Meat'),
};

const usaDataExportMeat = {
  title: 'Line Chart',
  chartType: 'LineChart',
  key: 'usaDataExportMeat',
  width,
  height,
  columns: importExportcolumns,
  rows: usaDataExportMeatArray,
  options: makeImportExportOptions('Export','USA Meat'),
};

const usaDataImportMeat = {
  title: 'Line Chart',
  chartType: 'LineChart',
  key: 'usaDataImportMeat',
  width,
  height,
  columns: importExportcolumns,
  rows: usaDataImportMeatArray,
  options:  makeImportExportOptions('Export','USA Meat'),
};

export  {
          indiaDataExport,
          denmarkDataExport,
          brazilDataExport,
          usaDataExport,
          japanDataExport,
          denmarkDataImport,
          indiaDataImport,
          brazilDataImport,
          usaDataImport,
          japanDataImport,
          usaDataExportVehicles,
          usaDataImportVehicles,
          usaDataExportPaper,
          usaDataImportPaper,
          usaDataExportMeat,
          usaDataImportMeat,
        }
