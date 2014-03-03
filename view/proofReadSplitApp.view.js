sap.ui.jsview("sap.ui.demo.myFiori.view.proofReadSplitApp",
{		
getControllerName:function()
{
	return "sap.ui.demo.myFiori.view.proofReadSplitApp";
},
createContent:function(oController)
{		

		var esplit1 = new sap.m.SplitApp("PFquestions");
		var masterPage = new sap.ui.xmlview("MasterPF", "sap.ui.demo.myFiori.view.MasterPF");
		masterPage.getController().nav = this.getController();
		esplit1.addMasterPage(masterPage);
		
		var detailPage = sap.ui.xmlview("DetailPF", "sap.ui.demo.myFiori.view.DetailPF");
		detailPage.getController().nav =  this.getController();
		esplit1.addDetailPage(detailPage);

		var questioneditpage = sap.ui.view({id:"EditQuestionPF", viewName:"sap.ui.demo.myFiori.view.EditPF", type:sap.ui.core.mvc.ViewType.JS});
		questioneditpage.getController().nav =  this.getController();
		esplit1.addDetailPage(questioneditpage);

		

		return new sap.m.Page("PFquestionscontainer",{
								showHeader:false,
								content:esplit1
							});

	}


});