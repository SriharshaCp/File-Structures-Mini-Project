const { ipcRenderer, contextBridge } = require("electron")
var XLSX = require('xlsx');

let sendSubmit=(dataObj)=>{
  ipcRenderer.send("callPython",dataObj)
}

let sendReadExcel=(data)=>{
    const HTMLOUT = document.getElementById('htmlout');
    HTMLOUT.innerHTML = "";
    let wb=XLSX.read(data, {type: 'array'})
    wb.SheetNames.forEach(function(sheetName) {
    const detailstag = document.createElement("details")
    const summaryTag = document.createElement("summary")
		const htmlstr = XLSX.utils.sheet_to_html(wb.Sheets[sheetName],{editable:false});
		detailstag.innerHTML = htmlstr;
    detailstag.append(summaryTag)
    HTMLOUT.append(detailstag)
    
    summaryTag.innerText=sheetName

    
	});

}

let indexBridge={
  sendSubmit :sendSubmit,
  sendReadExcel:sendReadExcel
}




contextBridge.exposeInMainWorld("Bridge",indexBridge)


