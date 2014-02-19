jQuery.sap.require("sap.ui.demo.myFiori.util.Formatter");

sap.ui.controller("sap.ui.demo.myFiori.view.Master", {

	onAfterRendering: function() {
		var app = sap.ui.getCore().byId("myquestions");
		app.setMode(sap.m.SplitAppMode.HideMode);
		},
	
	handleNavButtonPress : function (evt) {
		//var app = sap.ui.getCore().byId("myFiori");
		var app = sap.ui.getCore().byId("myFiori");
		app.backToPage("homePage");
	}, 
	
	handleSearch : function (evt) { 
		// create model filter 
		var filters = []; 
		var query = evt.getParameter("query"); 
		if (query && query.length > 0) { 
			var filter = new sap.ui.model.Filter("QuesId", sap.ui.model.FilterOperator.Contains, query); 
			filters.push(filter); 
		} 
		
		// update list binding 
		var list = this.getView().byId("list"); 
		var binding = list.getBinding("items"); 
		binding.filter(filters); 
		}, 
		
		handleListSelect : function (evt) {

			var context = evt.getParameter("listItem").getBindingContext(); 
			this.nav.to("Detail",context);
		},
		
		createButtonPress : function(evt) {
			/*var app = sap.ui.getCore().byId("myFiori");
			// load the Master page	
			app.toDetail("Input");*/
		},	
		
		
});