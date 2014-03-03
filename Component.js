jQuery.sap.declare("sap.ui.demo.myFiori.Component");

sap.ui.core.UIComponent.extend("sap.ui.demo.myFiori.Component", {

	createContent : function() {


		//Extract Username from url - Code by phani

		userID ='';
		
		var name = "inumber";
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
        var tests = (results == null) ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        tests = tests.split(",");
     
        for(var test in tests) {
        	var t = tests[test];
        
        	if(t) {
                 userID= t;
               }
               else {
                      console.warn("No User ID Entered");
                      return;
               }
        }
 


		// create root view
		var oView = sap.ui.view({
			id : "app",
			viewName : "sap.ui.demo.myFiori.view.App",
			type : "JS",
			viewData : { component : this}
		});

		// set i18n model 
		var i18nModel = new sap.ui.model.resource.ResourceModel({ 
			bundleUrl : "i18n/messageBundle.properties" 
				}); 
		oView.setModel(i18nModel, "i18n");
		sap.ui.getCore().setModel(i18nModel, "i18n");
		
		// set device model 
		var deviceModel = new sap.ui.model.json.JSONModel({ 
			isPhone : jQuery.device.is.phone, 
			isNoPhone : ! jQuery.device.is.phone, 
			listMode : (jQuery.device.is.phone) ? "None" : "SingleSelectMaster", 
			listItemType : (jQuery.device.is.phone) ? "Active" : "Inactive" 
			}); 
		deviceModel.setDefaultBindingMode("OneWay"); 
		oView.setModel(deviceModel, "device");
		
		// set local model
		var localModel = new sap.ui.model.json.JSONModel({
			appMode : null,
			inEdit : false,
			inDelete : false,
			inBatch : false
		});
		oView.setModel(localModel, "local");
		sap.ui.getCore().setModel(localModel, "local");

		// Using a local model for offline development
		var oModel = new sap.ui.model.json.JSONModel("model/mock_quiz.json");
		oView.setModel(oModel);
		sap.ui.getCore().setModel(oModel);
		// done
		return oView;
	}
});