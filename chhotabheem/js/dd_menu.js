// JavaScript Document

function Browser() 
{ 
       var ua, s, i; 
 
       this.isIE    = false;  // Internet Explorer 

       this.isNS    = false;  // Netscape 

       this.version = null; 
 
       ua = navigator.userAgent; 
 
       s = "MSIE"; 
       if ((i = ua.indexOf(s)) >= 0) 
     { 
         this.isIE = true; 
         this.version = parseFloat(ua.substr(i + s.length)); 
         return; 
       } 
 
       s = "Netscape6/"; 
       if ((i = ua.indexOf(s)) >= 0) 
     { 
         this.isNS = true; 
         this.version = parseFloat(ua.substr(i + s.length)); 
         return; 
       } 
 
       // Treat any other "Gecko" browser as NS 6.1. 

 
       s = "Gecko"; 
       if ((i = ua.indexOf(s)) >= 0) 
     { 
         this.isNS = true; 
         this.version = 6.1; 
         return; 
       } 
} 
 
var browser = new Browser(); 
 
//---------------------------------------------------------------------------- 

// Code for handling the attr bar and active button. 

//---------------------------------------------------------------------------- 

 
var activeButton = null; 
 
function buttonClick(event, attrId) 
{ 
       var button; 
 
       // Get the target button element. 

 
       if (browser.isIE) 
    { 
          button = window.event.srcElement; 
       } 
       else 
    { 
          button = event.currentTarget; 
     } 
      
       // Blur focus from the link to remove that annoying outline. 

 
       button.blur(); 
 
       // Associate the named attr to this button if not already done. 

       // Additionally, initialize attr display. 

 
       if (button.attr == null) 
     { 
         button.attr = document.getElementById(attrId); 
     } 
     
     if (button.attr.isInitialized == null) 
     { 
      attrInit(button.attr); 
       } 
 
//For activate/deactivate on mouseover. 

 
// Set mouseout event handler for the button, if not already done. 

 
if (button.onmouseout == null) 
{ 
     button.onmouseout = buttonOrattrMouseout; 
} 
 
// Exit if this button is the currently active one. 

 
if (button == activeButton) 
{ 
     return false; 
} 
 
// Reset the currently active button, if any. 

 
if (activeButton != null) 
{ 
     resetButton(activeButton); 
} 
// Activate this button, unless it was the currently active one. 

 
if (button != activeButton) 
{ 
     depressButton(button); 
    activeButton = button; 
} 
else 
{ 
     activeButton = null; 
} 
 
     return false; 
} 
 
function buttonMouseover(event, attrId) 
{ 
       var button; 
 
       //For activate/deactivate on mouseover. 

 
       // Activates this button's attr if no other is currently active. 

 
       if (activeButton == null) 
     { 
         buttonClick(event, attrId); 
         return; 
       } 
 
       // Find the target button element. 

 
       if (browser.isIE) 
     { 
         button = window.event.srcElement; 
       } 
     else 
    { 
          button = event.currentTarget; 
     } 
      
       // If any other button attr is active, make this one active instead. 

 
       if (activeButton != null && activeButton != button) 
     { 
         buttonClick(event, attrId); 
     } 
} 
 
function depressButton(button) 
{ 
       var x, y; 
 
       // Update the button's style class to make it look like it's 

       // depressed. 

 
       button.className += " attrButtonActive"; 
 
       //For activate/deactivate on mouseover. 

 
       // Set mouseout event handler for the button, if not already done. 

 
       if (button.onmouseout == null) 
     { 
         button.onmouseout = buttonOrattrMouseout; 
       } 
     if (button.attr.onmouseout == null) 
    { 
           button.attr.onmouseout = buttonOrattrMouseout; 
     } 
   
       // Position the associated drop down attr under the button and 

       // show it. 

 
       x = getPageOffsetLeft(button); 
       y = getPageOffsetTop(button) + button.offsetHeight; 
 
       // For IE, adjust position. 

 
       if (browser.isIE) 
     { 
         x += button.offsetParent.clientLeft; 
         y += button.offsetParent.clientTop; 
       } 
 
     // You can modify the x and y positions here to move the drop down 

       button.attr.style.left = x + "px"; 
       button.attr.style.top  = y + "px"; 
       button.attr.style.visibility = "visible"; 
} 
 
function resetButton(button) 
{ 
       // Restore the button's style class. 

 
       removeClassName(button, "attrButtonActive" ); 
 
       // Hide the button's attr, first closing any sub attrs. 

 
       if (button.attr != null) 
     { 
         closeSubattr(button.attr); 
         button.attr.style.visibility = "hidden"; 
       } 
} 
 
//---------------------------------------------------------------------------- 

// Code to handle the attrs and sub attrs. 

//---------------------------------------------------------------------------- 

 
function attrMouseover(event) 
{ 
       var attr; 
 
       // Find the target attr element. 

 
       if (browser.isIE) 
     { 
         attr = getContainerWith(window.event.srcElement, "DIV", "attr" ); 
       } 
     else 
    { 
          attr = event.currentTarget; 
     } 
      
       // Close any active sub attr. 

 
       if (attr.activeItem != null) 
     { 
         closeSubattr(attr); 
     } 
} 
 
function attrItemMouseover(event, attrId) 
{ 
       var item, attr, x, y; 
 
       // Find the target item element and its parent attr element. 

 
       if (browser.isIE) 
     { 
         item = getContainerWith(window.event.srcElement, "A", "attrItem" ); 
       } 
     else 
    { 
          item = event.currentTarget; 
       } 
      
       attr = getContainerWith(item, "DIV", "attr" ); 
 
       // Close any active sub attr and mark this one as active. 

 
       if (attr.activeItem != null) 
     { 
         closeSubattr(attr); 
       } 
      
       attr.activeItem = item; 
 
       // Highlight the item element. 

 
       item.className += " attrItemHighlight"; 
 
       // Initialize the sub attr, if not already done. 

 
       if (item.subattr == null) 
     { 
         item.subattr = document.getElementById(attrId); 
    } 
     if (item.subattr.isInitialized == null) 
    { 
            attrInit(item.subattr); 
       } 
 
       //For activate/deactivate on mouseover. 

 
       // Set mouseout event handler for the sub attr, if not already done. 

 
       if (item.subattr.onmouseout == null) 
     { 
         item.subattr.onmouseout = buttonOrattrMouseout; 
     } 
   
       // Get position for subattr based on the attr item. 

 
       x = getPageOffsetLeft(item) + item.offsetWidth; 
       y = getPageOffsetTop(item); 
 
       // Adjust position to fit in view. 

 
       var maxX, maxY; 
 
       if (browser.isNS) 
     { 
         maxX = window.scrollX + window.innerWidth; 
         maxY = window.scrollY + window.innerHeight; 
       } 
      
       if (browser.isIE) 
     { 
         maxX = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft) + 
           (document.documentElement.clientWidth != 0 ? document.documentElement.clientWidth :  
          document.body.clientWidth); 
     
          maxY = Math.max(document.documentElement.scrollTop, document.body.scrollTop) + 
           (document.documentElement.clientHeight != 0 ? document.documentElement.clientHeight :  
          document.body.clientHeight); 
       } 
      
       maxX -= item.subattr.offsetWidth; 
       maxY -= item.subattr.offsetHeight; 
 
       if (x > maxX) 
     { 
         x = Math.max(0, x - item.offsetWidth - item.subattr.offsetWidth 
           + (attr.offsetWidth - item.offsetWidth)); 
   
            y = Math.max(0, Math.min(y, maxY)); 
     } 
      
       // Position and show the sub attr. 

 
       item.subattr.style.left = x + "px"; 
       item.subattr.style.top  = y + "px"; 
       item.subattr.style.visibility = "visible"; 
 
       // Stop the event from bubbling. 

 
       if (browser.isIE) 
     { 
         window.event.cancelBubble = true; 
       } 
     else 
    { 
          event.stopPropagation(); 
     } 
} 
 
function closeSubattr(attr) 
{ 
       if (attr == null || attr.activeItem == null) 
     { 
         return; 
     } 
      
       // Recursively close any sub attrs. 

 
       if (attr.activeItem.subattr != null) 
     { 
         closeSubattr(attr.activeItem.subattr); 
         attr.activeItem.subattr.style.visibility = "hidden"; 
         attr.activeItem.subattr = null; 
       } 
      
       removeClassName(attr.activeItem, "attrItemHighlight" ); 
       attr.activeItem = null; 
} 
 
//For activate/deactivate on mouseover. Handler for mouseout 

// event on buttons and attrs. 

 
function buttonOrattrMouseout(event) 
{ 
       var el; 
 
       // If there is no active button, exit. 

 
       if (activeButton == null) 
    { 
          return; 
     } 
   
       // Find the element the mouse is moving to. 

 
       if (browser.isIE) 
     { 
         el = window.event.toElement; 
       } 
     else if (event.relatedTarget != null) 
     { 
           el = (event.relatedTarget.tagName ? event.relatedTarget : event.relatedTarget.parentNode); 
     } 
   
       // If the element is not part of a attr, reset the active button. 

 
       if (getContainerWith(el, "DIV", "attr" ) == null) 
    { 
          resetButton(activeButton); 
         activeButton = null; 
       } 
} 
 
//---------------------------------------------------------------------------- 

// Code to initialize attrs. 

//---------------------------------------------------------------------------- 

 
function attrInit(attr) 
{ 
      var itemList, spanList; 
       var textEl, arrowEl; 
       var itemWidth; 
       var w, dw; 
       var i, j; 
 
       // For IE, replace arrow characters. 

 
       if (browser.isIE) 
     { 
         attr.style.lineHeight = "2.5ex"; 
         spanList = attr.getElementsByTagName("SPAN" ); 
           
         for (i = 0; i < spanList.length; i++) 
           { 
               if (hasClassName(spanList[i], "attrItemArrow" )) 
               { 
                  spanList[i].style.fontFamily = "Webdings"; 
                  spanList[i].firstChild.nodeValue = "4"; 
                } 
          } 
       } 
 
       // Find the width of a attr item. 

 
       itemList = attr.getElementsByTagName("A" ); 
      
      if (itemList.length > 0) 
    { 
          itemWidth = itemList[0].offsetWidth; 
       } 
       else 
    { 
          return; 
     } 
      
       // For items with arrows, add padding to item text to make the 

       // arrows flush right. 

 
       for (i = 0; i < itemList.length; i++) 
    { 
          spanList = itemList[i].getElementsByTagName("SPAN" ); 
         textEl  = null; 
         arrowEl = null; 
           
         for (j = 0; j < spanList.length; j++) 
          { 
                if (hasClassName(spanList[j], "attrItemText" )) 
               { 
                  textEl = spanList[j]; 
               } 
                if (hasClassName(spanList[j], "attrItemArrow" )) 
               { 
                  arrowEl = spanList[j]; 
               } 
         } 
           
         if (textEl != null && arrowEl != null) 
          { 
                textEl.style.paddingRight = (itemWidth 
             - (textEl.offsetWidth + arrowEl.offsetWidth)) + "px"; 
            } 
       } 
 
       // Fix IE hover problem by setting an explicit width on first item of 

       // the attr. 

 
       if (browser.isIE) 
     { 
         w = itemList[0].offsetWidth; 
         itemList[0].style.width = w + "px"; 
         dw = itemList[0].offsetWidth - w; 
         w -= dw; 
         itemList[0].style.width = w + "px"; 
       } 
 
       // Mark attr as initialized. 

 
       attr.isInitialized = true; 
} 
 
//---------------------------------------------------------------------------- 

// General utility functions. 

//---------------------------------------------------------------------------- 

 
function getContainerWith(node, tagName, className) 
{ 
       // Starting with the given node, find the nearest containing element 

       // with the specified tag name and style class. 

 
       while (node != null) 
     { 
         if (node.tagName != null && node.tagName == tagName && hasClassName(node, className)) 
           { 
                 return node; 
         } 
      
          node = node.parentNode; 
       } 
 
       return node; 
} 
 
function hasClassName(el, name) 
{ 
       var i, list; 
 
       // Return true if the given element currently has the given class 

       // name. 

 
       list = el.className.split(" " ); 
   
       for (i = 0; i < list.length; i++) 
       { 
         if (list[i] == name) 
           { 
               return true; 
          } 
           
            return false; 
     } 
} 
 
function removeClassName(el, name) 
{ 
       var i, curList, newList; 
 
       if (el.className == null) 
     { 
         return; 
     } 
      
       // Remove the given class name from the element's className property. 

 
       newList = new Array(); 
       curList = el.className.split(" " ); 
   
       for (i = 0; i < curList.length; i++) 
     { 
         if (curList[i] != name) 
           { 
               newList.push(curList[i]); 
          } 
   
            el.className = newList.join(" " ); 
     } 
} 
 
function getPageOffsetLeft(el) 
{ 
       var x; 
 
       // Return the x coordinate of an element relative to the page. 

 
       x = el.offsetLeft; 
   
       if (el.offsetParent != null) 
    { 
          x += getPageOffsetLeft(el.offsetParent); 
     } 
   
       return x; 
} 
 
function getPageOffsetTop(el) 
{ 
       var y; 
 
       // Return the x coordinate of an element relative to the page. 

 
       y = el.offsetTop; 
   
       if (el.offsetParent != null) 
       { 
         y += getPageOffsetTop(el.offsetParent); 
     } 
   
       return y; 
}

