/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.commons.ColorPickerRenderer");sap.ui.commons.ColorPickerRenderer={};
sap.ui.commons.ColorPickerRenderer.render=function(r,c){r.write("<div");r.writeControlData(c);r.write(">");r.renderControl(c.oMatrix);r.write("</div>")};
