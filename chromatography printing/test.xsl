<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html>
		<head>
			<style type="text/css">
				div,span{float:left}
				body{width:760px;font-size:12px;margin:0;padding:0;overflow:hidden;}
				div.leftBoard,div.rightBoard{height:300px;}
				div.leftBoard{width:160px}
				div.rightBoard{width:600px;}
				
				
				#attachMsg,#chequeDate,#receiver,#amount,#usage,#leftBottom{width:100%}
				#attachMsg{margin-top:100px;padding-left:15px;height:40px}
				#chequeDate{margin-top:3px;padding-left:37px;height:20px;}
				#chequeDate span{margin-left:2px;width:30px;text-align:right;}
				#receiver{margin-top:5px;padding-left:38px;}
				#amount{margin-top:24px;padding-left:38px;}
				#usage{margin-top:6px;padding-left:38px;}
				#leftBottom{margin-top:10px;padding-left:15px;}
				#leftBottom span{margin-left:15px;width:48px;text-align:right;}
				
				#rightRow1,#rightRow2,#rightRow3,#rightRow4,#rightRow5{width:100%;margin-top:5px;}
				#rightRow1{margin-top:38px;padding-left:130px;height:15px;}
				#rightRow2{margin-top:2px;}
				#rightRow1 span{margin-left:10px;width:50px;height:15px;text-align:right;}
				#rightRow1 #payBankName{width:100px;margin-left:80px;}
				#rightReceiver{margin-left:80px;width:200px;}
				#rightAccountNo{margin-left:160px;width:60px;}
				#rightRow3{margin-top:15px;padding-left:30px;height:25px;font-size:14px;font-weight:bold;}
				#upperCaseAmount{width:270px;margin-left:70px;}
				#moneySymble{width:10px;padding-top:12px;float:right;}
				#lowerCaseAmount{float:right;margin-right:13px;width:auto;text-align:right;padding-top:10px;letter-spacing:8px;}
				#rightRow4{margin-top:15px;}
				#rightUsage{margin-left:80px;width:160px}
				#rightPswd{margin-left:150px;}
				#bankNo{margin-left:390px;}
				#rightRow6{margin-top:40px;}
				#review{margin-left:390px;width:60px;}
				#bookkeeping{margin-left:20px;width:60px;}
			</style>
			<xsl:variable name="myscript">
      		<![CDATA[
			<script type="text/javascript">
				function transform(){
					var respContent = document.getElementById("respContent");
					var arr = respContent.value.split("\n");
					document.getElementById("rightReceiver").innerHTML = arr[3];
					document.getElementById("payBankName").innerHTML = arr[7];
					document.getElementById("receiver").innerHTML = arr[5];
					document.getElementById("rightUsage").innerHTML = arr[6];
				}
				window.onload=function(){transform()};
			</script>
			 ]]>
   			</xsl:variable>
   			<xsl:value-of select="$myscript" disable-output-escaping="yes"/>
		</head>
		
			<body>
				<div class="leftBoard">
					<div id="attachMsg">预存款</div>
					<div id="chequeDate">
						<span>2011</span>
						<span>07</span>
						<span>11</span>
					</div>
					<div id="receiver">黄健翔</div>
					<div id="amount">99992.23</div>
					<div id="usage">货款</div>
					<div id="leftBottom">
						<span>王灵</span>
						<span>王凌云</span>
					</div>
				</div>
				<div class="rightBoard">
					<div id="rightRow1">
						<span>二零壹壹</span>
						<span>柒</span>
						<span>贰拾叁</span>
						<span id="payBankName">厦门国际银行</span>
					</div>
					<div id="rightRow2">
						<span id="rightReceiver">吴用</span>
						<span id="rightAccountNo">622901939101992</span>
					</div>
					<div id="rightRow3">
						<span id="upperCaseAmount">玖万玖千玖佰玖拾贰元贰角叁分</span>
						
						<span id="lowerCaseAmount">9999223</span>
						<span id="moneySymble">￥</span>
					</div>
					<div id="rightRow4">
						<span id="rightUsage">货款</span>
						<span id="rightPswd">无</span>
					</div>
					<div id="rightRow5">
						<span id="bankNo">901</span>
					</div>
					<div id="rightRow6">
						<span id="review">林平</span>
						<span id="bookkeeping">谢雨欣</span>
					</div>
					<input type="hidden" id="respContent">
						<xsl:attribute name="value"><xsl:value-of select="/responseDetails/window/panes/pane/dataSection/enqResponse/r/c/rpt"/></xsl:attribute>
					</input>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
