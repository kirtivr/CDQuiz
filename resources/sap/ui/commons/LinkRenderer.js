/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.commons.LinkRenderer");sap.ui.commons.LinkRenderer={};
sap.ui.commons.LinkRenderer.render=function(r,l){if(!l.getVisible()){return}r.write("<a");r.writeControlData(l);r.writeAccessibilityState(l);if(!l.getEnabled()){r.addClass("sapUiLnkDsbl");r.writeAttribute("disabled","true")}else{r.addClass("sapUiLnk")}r.writeClasses();if(l.getTooltip_AsString()){r.writeAttributeEscaped("title",l.getTooltip_AsString())}if(l.getHref()){r.writeAttributeEscaped("href",l.getHref())}else{r.writeAttribute("href","javascript:void(0);")}if(l.getTarget()){r.writeAttributeEscaped("target",l.getTarget())}if(!l.getEnabled()){r.writeAttribute("tabIndex","-1")}else{r.writeAttribute("tabIndex","0")}if(l.getWidth()){r.addStyle("width",l.getWidth())}r.writeStyles();r.write(">");if(l.getText()){r.writeEscaped(l.getText())}r.write("</a>")};
