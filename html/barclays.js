function saveImage() {
    imagename  = document.getElementById("imagename").value;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST",  "http://ec2-54-174-166-252.compute-1.amazonaws.com:3000/api/saveipfsimage", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("imagename=" + imagename );
    xhttp.onreadystatechange = function(){
        var messageDiv = document.getElementById("message");
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.response);
            if (data.message != "Correct") {
		        document.getElementById("message").innerHTML = "Error in system";
            } else {
            //    docname = data.docname;
                document.getElementById("message").innerHTML="Saved in the system";
            }
        }
    };
}
