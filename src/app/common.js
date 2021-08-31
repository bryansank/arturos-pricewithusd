import { map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax'

export default class Common{ 
    static doServerMethod$(methodName, params) {

        /* esta validacion es para que deje hacer build con el npm run build */ 
            let pageContext  =  "";
            
            if (!window._spPageContextInfo){
                var _spPageContextInfo = { siteServerRelativeUrl : "" };
                pageContext = _spPageContextInfo;
                console.error("no se pudo cargar el contexto de sharepoint!");
            } else {
                pageContext = window._spPageContextInfo;
            }
        /* ----------------------------------------------------------------------*/
        
        let svcUrl = pageContext.siteServerRelativeUrl + 
        ((pageContext.siteServerRelativeUrl.substring(pageContext.siteServerRelativeUrl.length -1) != "/") ? "/": "") +  "_layouts/InventoryModule/InventoryWebMethods.aspx/" + methodName;

        let jsonParams = "{}";

        if (params)
            jsonParams =  params;
            
        debugger;
        
        return ajax.post(svcUrl, jsonParams, { 'Content-Type': 'application/json' })
            .pipe(map(e => e.response.d));
    }

    static convertDate(dtValue) {        
           function pad(s) { return (s < 10) ? '0' + s : s; }
        debugger;
        var d = null; 
       
        if (dtValue && dtValue.toString().indexOf("Date") != -1){
           var dtString = dtValue.toString();
           d = new Date(Number(dtString.substring(6, dtString.indexOf(')'))));
        } else if (!(dtValue && typeof dtValue.getMonth === 'function')){
            d = new Date(dtValue);  
        } else {
            d = new Date(dtValue.getTime());
        }
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
    }   

    static IsDesignMode() {
        let wpFormName = "dummy";
        if (window.MSOWebPartPageFormName)
          wpFormName = window.MSOWebPartPageFormName;
            
        var inDesign = document.forms[wpFormName].MSOLayout_InDesignMode;
        if (inDesign != null && inDesign.value == "1") return true;
    
        var dispMode = document.forms[wpFormName].MSOSPWebPartManager_DisplayModeName;
        if (dispMode != null && dispMode.value == "Edit") return true;
            
        return false;
    }
}