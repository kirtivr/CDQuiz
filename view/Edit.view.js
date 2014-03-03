sap.ui.jsview("sap.ui.demo.myFiori.view.Edit", {

	getControllerName: function () {
		return "sap.ui.demo.myFiori.view.Edit";
	},
	
	createContent: function (oController) {
		
		mob = sap.m;
		this._qCat = new mob.List("questionSettingsListEdit");
		this._IqCat = new mob.InputListItem({
												label:"{i18n>QuesCat}"});
		this._questioncatinput = new mob.Input("QuesCatEdit",{
															type:mob.InputType.Text,valueHelpRequest:oController.valueHelpRequest,showValueHelp:true,placeholder:"{QuesCat}"
														});
	
		this._IqCat.addContent(this._questioncatinput);
		this._IqSCat = new mob.InputListItem({
												label:"{i18n>QuesSubCat}"
											 }); 
		this._questionsubcatinput = new mob.Input("QuesSubCatEdit",{
																type:mob.InputType.Text,valueHelpRequest:oController.valueHelpRequestQuesSubCat,showValueHelp:true,placeholder:"{QuesSubCat}"
																});
	
		this._IqSCat.addContent(this._questionsubcatinput);

		this._qCat.addItem(this._IqCat);
		this._qCat.addItem(this._IqSCat);

		this._QEditor = new mob.TextArea("CreateQuestionTAEdit",{width:"100%" , rows:5 }).addStyleClass('EditMyQuestions');

		this._buttonAccept = new mob.Button("btnAcceptEdit",{icon:"sap-icon://accept",press:oController.acceptButtonPress ,visible:true ,text:"{i18n>AcceptText}"});
		this._buttonCancel = new mob.Button("btnCancelEdit",{icon:"sap-icon://decline",press:oController.cancelButtonPress ,visible:true ,text:"{i18n>CancelText}"});

		this._footer = new mob.Bar("footerBarEdit" ,{translucent:true,contentRight:[this._buttonAccept,this._buttonCancel]});

		this._PageVertLayout = new mob.VBox("CreateQVertLayoutEdit",{height:"100%" , items:[this._qCat,this._QEditor]});
		this._Screen = new mob.Page({
										title:"{i18n>TileT1}",content:[this._PageVertLayout],footer:this._footer
									}).addStyleClass("sapUiFioriObjectPage");
		
		return this._Screen;
	}
});