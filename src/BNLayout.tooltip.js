banglaLayout.prototype.loadHelpTooltip = function () {
    try {
        if (typeof window.jQuery === "undefined")
            return this;

        var toolTipText = "ctrl+m অথবা F9 চেপে বাংলা ও ইংরেজীতে সুইচ করতে পারবেন..\n..হ=H, ৎ=Z, ঙ=x, ঞ=X, ং=V, ঁ=B, ঃ=M";

        var $parent = jQuery("#" + this.sourceField);
        var left = $parent.position().left + $parent.width();
        left -= $parent.width() < 3 ? 0 : 3;
        var top = $parent.position().top;
        top += $parent.height() < 5 ? 0 : 5;

        var $tooltipDiv = document.createElement("abbr");
        $tooltipDiv.setAttribute("style", "width: 10px; position:absolute; cursor:help; color:red; left:" + (left) + "px;top:" + (top) + "px;");
        $tooltipDiv.innerHTML = "?";
        $tooltipDiv.setAttribute("title", toolTipText);
        $tooltipDiv.onmouseover = function () { };

        jQuery($tooltipDiv).insertAfter($parent);
        return this;
    } catch (e) {
        if (console)
            console.log(e.message);
    }
};