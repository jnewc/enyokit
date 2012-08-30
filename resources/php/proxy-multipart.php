<?php

// -- Sort out parameters for upload
//echo "FILES: " . json_encode($_FILES);
//echo "\n\nPOST: " . json_encode($_POST);

$image_file      = $_FILES['media'];
$image_filename  = $image_file['tmp_name'];
$api_key         = $_POST["key"];
$url             = $_POST["url"]; // TODO

$postdata = array(
	"media" => "@" . $image_filename,
	"key"   => $api_key
);


// -- Create curl request
$curl_handle = curl_init();

// -- Set curl headers
// Should be array of strings in the form "Name: value".
if(isset($_POST["headers"])) {
	$headers = json_decode($_POST["headers"]);
	if(!is_array($headers)) { $headers = array( 0 => $headers ); }
} else {
	$headers = array();
}

// -- curl Set upload parameters
curl_setopt($curl_handle, CURLOPT_POSTFIELDS, $postdata);

// -- Set all curl options
curl_setopt($curl_handle, CURLOPT_URL, $url);
curl_setopt($curl_handle, CURLOPT_CONNECTTIMEOUT, 60);
curl_setopt($curl_handle, CURLOPT_TIMEOUT, 60);
curl_setopt($curl_handle, CURLOPT_HEADER, false); // Set to true to show headers in body.
curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl_handle, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($curl_handle, CURLOPT_HTTPHEADER, $headers);
// Execute request.
$response = curl_exec($curl_handle);
if (curl_error($curl_handle)) {
    die("ERROR: ". curl_error($curl_handle) ."\n<br/>");
}

// -- Return response.
// Create JSON response
$returnResponse = array();
$returnResponse["status"] = curl_getinfo($curl_handle, CURLINFO_HTTP_CODE);
$returnResponse["content_length"] = curl_getinfo($curl_handle, CURLINFO_CONTENT_LENGTH_DOWNLOAD);
$returnResponse["responseText"] = $response;
// Close request
curl_close($curl_handle);
// Return response
echo json_encode($returnResponse);
	
?>