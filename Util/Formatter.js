jQuery.sap.declare("sap.ui.demo.myFiori.util.Formatter");

jQuery.sap.require("sap.ui.core.format.DateFormat");

sap.ui.demo.myFiori.util.Formatter = {
	
	_statusStateMap : {
		"C" : "Success",
		"R" : "Success",
		"P" : "Warning",
		"N" : "Error"
	},

	isT1 :  function (value) {
		return (value=="T1") ? "true" : "false";
	},
	
	statusText :  function (value) {
		var bundle = this.getModel("i18n").getResourceBundle();
		return bundle.getText("StatusText" + value, "?");
	},
	
	versionText :  function (value) {
		var bundle = this.getModel("i18n").getResourceBundle();
		var vText = bundle.getText("VersionTitle", "?");
		return  vText + " " +  value;		
	},

	
	AnsCatText :  function (value) {
		var bundle = this.getModel("i18n").getResourceBundle();
		return bundle.getText("AnsCatText" + value, "?");
	},
	
	statusState :  function (value) {
		var map = sap.ui.demo.myFiori.util.Formatter._statusStateMap;
		return (value && map[value]) ? map[value] : "None";
	},
	
	date : function (value) {
		if (value) {
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "yyyy-MM-dd"}); 
			return oDateFormat.format(new Date(value));
		} else {
			return value;
		}
	},
	
	quantity :  function (value) {
		try {
			return (value) ? parseFloat(value).toFixed(0) : value;
		} catch (err) {
			return "Not-A-Number";
		}
	}
};