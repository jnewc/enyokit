<?php

$params = json_decode($_GET["json"]);

// -- Create curl request
$curl_handle = curl_init();

// -- Set curl method
if($params->method == "POST") {
	curl_setopt($curl_handle, CURLOPT_POST, true);
	// -- Set curl body
	if(property_exists($params, "body")) {
		curl_setopt($curl_handle, CURLOPT_POSTFIELDS, $params->body);
	}
	else {
		curl_setopt($curl_handle, CURLOPT_POSTFIELDS, null);
	}
}




// -- Create headers
// IMPORTANT MUST BE PASSED AS ARRAY OF STRINGS.
$headers = array();
$headers[0] = "Content-Type: application/x-www-form-urlencoded";
if(isset($params->headers)){
	foreach($params->headers as $header) {
		array_push($headers, $header->key . ": " . $header->value);
		//echo $header->key . ": " . $header->value . "\n";
	}
}

// -- Set all curl options
curl_setopt($curl_handle, CURLOPT_URL, $params->url);
curl_setopt($curl_handle, CURLOPT_CONNECTTIMEOUT, 30);
curl_setopt($curl_handle, CURLOPT_TIMEOUT, 30);
curl_setopt($curl_handle, CURLOPT_HEADER, false); // Set to true to show headers in body.
curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl_handle, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($curl_handle, CURLOPT_HTTPHEADER, $headers);
// Execute request.
$response = curl_exec($curl_handle);

// -- Return response.
// Create JSON response
$returnResponse = array();
$returnResponse["status"] = curl_getinfo($curl_handle, CURLINFO_HTTP_CODE);
$returnResponse["content_length"] = curl_getinfo($curl_handle, CURLINFO_CONTENT_LENGTH_DOWNLOAD);
if (curl_error($curl_handle)) {
	$returnResponse["responseText"] = "ERROR";
}
else {
	$returnResponse["responseText"] = $response;
}

// Close request
curl_close($curl_handle);
// Return response
echo json_encode($returnResponse);

?>