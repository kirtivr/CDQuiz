//test

sap.ui.jsview("sap.ui.demo.myFiori.view.App", {

	getControllerName: function () {
		return "sap.ui.demo.myFiori.view.App";
	},
	
	createContent: function (oController) {
		
		jQuery.sap.require("sap.ui.core.IconPool");
		
		// to avoid scroll bars on desktop the root view must be set to block display
		this.setDisplayBlock(true);
		
		// create app
		this.app = new sap.m.App("myFiori", {
			
			/*afterDetailNavigate: function(){
				this.hideMaster();
			},*/
			
			homeIcon : {
				'phone' : 'img/57_iPhone_Desktop_Launch.png',
				'phone@2' : 'img/114_iPhone-Retina_Web_Clip.png',
				'tablet' : 'img/72_iPad_Desktop_Launch.png',
				'tablet@2' : 'img/144_iPad_Retina_Web_Clip.png',
				'favicon' : 'img/favicon.ico',
				'precomposed': false
			}			
		});
		//this.app.setMode(sap.m.SplitAppMode.HideMode);
		this.app.setHomeIcon();
		
		// load the empty pages
		var detailEmpty = sap.ui.xmlview("detailEmpty", "sap.ui.demo.myFiori.view.Empty"); 
		
		
		// load the home page with tiles
		var homePage = new sap.m.Page("homePage",{
			title:"{i18n>AppHome}",
			id:"Home",
			enableScrolling: false,
			icon: sap.ui.core.IconPool.getIconURI("home")
			});    
		
		
		var oContainer = new sap.m.TileContainer({});  
		homePage.addContent(oContainer);  

		function handlePress (oEvent) {
			var context = oEvent.getSource().getBindingContext();
			var app = sap.ui.getCore().byId("myFiori");
			
			// set local model
			this.getModel("local").setData({
				appMode : oEvent.mParameters.id
			});
			
			switch(oEvent.mParameters.id){
			case "T1":
				//app.setMode(sap.m.SplitAppMode.HideMode);
				// load the Master & Detail page								
				app.to("Input");				
				break;
				
			case "T2":
				//app.setMode(sap.m.SplitAppMode.HideMode);
				// load the Master & Detail page	
				app.to("questionSplitApp");
				break;
				
			case "T3":
				alert("This module not implemented yet ");
				break;
				
			case "T4":
				alert("This module not implemented yet ");
				// load the Master & Detail page								
				break;				
			case "T5":
				alert("This module not implemented yet ");	
				break;
			}
		}
		
		var T1 = new sap.m.StandardTile("T1", {
	        icon : sap.ui.core.IconPool.getIconURI("question-mark"),
	        number : "",
	        numberUnit : "",
	        title : "{i18n>TileT1}",
	        info : "",
	        infoState : "Success",
	        press : handlePress });
		oContainer.addTile(T1);
		
		var T2 = new sap.m.StandardTile("T2", {
	        icon : sap.ui.core.IconPool.getIconURI("employee-lookup"),
	        number : "",
	        numberUnit : "",
	        title : "{i18n>TileT2}",
	        info : "",
	        infoState : "Success",
	        press : handlePress });
		oContainer.addTile(T2);
		
		var T3 = new sap.m.StandardTile("T3", {
	        icon : sap.ui.core.IconPool.getIconURI("display"),
	        number : "",
	        numberUnit : "",
	        title : "{i18n>TileT3}",
	        info : "",
	        infoState : "Success",
	        press : handlePress });
		oContainer.addTile(T3);		
		
		var T4 = new sap.m.StandardTile("T4", {
	        icon : sap.ui.core.IconPool.getIconURI("accept"),
	        number : "",
	        numberUnit : "",
	        title : "{i18n>TileT4}",
	        info : "",
	        infoState : "Success",
	        press : handlePress });
		oContainer.addTile(T4);
		
		var T5 = new sap.m.StandardTile("T5", {
	        icon : sap.ui.core.IconPool.getIconURI("line-chart"),
	        number : "",
	        numberUnit : "",
	        title : "{i18n>TileT5}",
	        info : "",
	        infoState : "Success",
	        press : handlePress });
		oContainer.addTile(T5);
		
		// load home page
		this.app.addPage(homePage); 
		//this.app.addMasterPage(appHome);
		
		// load the master page	
		
		

		// load the input page
		var inputPage = sap.ui.xmlview("Input", "sap.ui.demo.myFiori.view.Input");
		inputPage.getController().nav = this.getController();
		this.app.addPage(inputPage);
		
		var questionSplitApp = sap.ui.view({id:"questionSplitApp", viewName:"sap.ui.demo.myFiori.view.questionSplitApp", type:sap.ui.core.mvc.ViewType.JS});
		questionSplitApp.getController().nav = this.getController();
		this.app.addPage(questionSplitApp);
		
		this.app.to("homePage");
		//this.app.toMaster("appHome");
		
		this.shell = new sap.m.Shell("Shell", {
			  title : "{i18n>AppHome}"
			  });
		
		// done
		this.shell.setApp(this.app);
		return this.app;
	}
});