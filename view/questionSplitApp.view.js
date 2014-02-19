sap.ui.jsview("sap.ui.demo.myFiori.view.questionSplitApp",
{		
getControllerName:function()
{
	return "sap.ui.demo.myFiori.view.questionSplitApp";
},
createContent:function(oController)
{		

		var esplit1 = new sap.m.SplitApp("myquestions");
		var masterPage = new sap.ui.xmlview("Master", "sap.ui.demo.myFiori.view.Master");
		masterPage.getController().nav = this.getController();
		esplit1.addMasterPage(masterPage);
		
		var detailPage = sap.ui.xmlview("Detail", "sap.ui.demo.myFiori.view.Detail");
		detailPage.getController().nav =  this.getController();
		esplit1.addDetailPage(detailPage);

		

		return esplit1;
	

	}


});