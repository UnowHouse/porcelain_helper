import XLSX from 'xlsx' 

/**
 * 获取地址栏参数值
 * @param name
 * @returns {null}
 * @constructor
 */
const GetQueryString = function (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  var s = window.location.search
  var href = window.location.href
  var index = href.indexOf('?')
  if (s === '') {
    r = href.substr(index + 1).match(reg)
  }
  if (r != null) return unescape(r[2])
  return null
}


const convertDateFromString = function (dateString){

    if (dateString) { 
      var date = new Date(dateString.replace(/-/,"/")) 
      return date;
    }else{
      return null;
    }
  
}

const exportTable = function(el, filename) {

    var table1 = document.querySelector(el);
    var sheet = XLSX.utils.table_to_sheet(table1);//将一个table对象转换成一个sheet对象
    sheet['!cols']= [{wpx: 85}, {wpx: 45}, {wpx: 45}, {wpx: 45},{wpx: 45},{wpx: 155}]
    openDownloadDialog(sheet2blob(sheet),`${filename}.xlsx`);
}

const exportJson = function (data, fields, filename) {

    var sheet = XLSX.utils.json_to_sheet(data,{ header: Object.values(fields) });//将一个table对象转换成一个sheet对象
    sheet['!cols']= [{wpx: 85}, {wpx: 45}, {wpx: 45}, {wpx: 45},{wpx: 45},{wpx: 125},{wpx:80}]
    openDownloadDialog(sheet2blob(sheet),`${filename}.xlsx`);
}

    // 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
const  sheet2blob = function(sheet, sheetName) {
      sheetName = sheetName || 'sheet1';
      var workbook = {
          SheetNames: [sheetName],
          Sheets: {}
      };
      workbook.Sheets[sheetName] = sheet; // 生成excel的配置项

      var wopts = {
          bookType: 'xlsx', // 要生成的文件类型
          bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
          type: 'binary'
      };
      var wbout = XLSX.write(workbook, wopts);
      var blob = new Blob([s2ab(wbout)], {
          type: "application/octet-stream"
      }); // 字符串转ArrayBuffer
      function s2ab(s) {
          var buf = new ArrayBuffer(s.length);
          var view = new Uint8Array(buf);
          for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
          return buf;
      }
      return blob;
  }

const  openDownloadDialog = function(url, saveName) {
      if (typeof url == 'object' && url instanceof Blob) {
          url = URL.createObjectURL(url); // 创建blob地址
      }
      var aLink = document.createElement('a');
      aLink.href = url;
      aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
      var event;
      if (window.MouseEvent) event = new MouseEvent('click');
      else {
          event = document.createEvent('MouseEvents');
          event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      }
      aLink.dispatchEvent(event);
  }

const utils = {
  GetQueryString,
  convertDateFromString,
  exportTable,
  exportJson,
}

export default utils