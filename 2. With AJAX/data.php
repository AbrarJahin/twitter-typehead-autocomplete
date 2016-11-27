<?php

	if( isset($_POST['search_string']) )
	{
		$arr = array(
					array(
						"name" => $_POST['search_string'].substr( md5(uniqid(mt_rand(), true)) ,0,10),
						"price" => rand()
					),
					array(
						"name" => $_POST['search_string'].substr( md5(uniqid(mt_rand(), true)) ,0,10),
						"price" => rand()
					),
					array(
						"name" => $_POST['search_string'].substr( md5(uniqid(mt_rand(), true)) ,0,10),
						"price" => rand()
					)
				);
		echo json_encode($arr);
	}
	else
	{
		echo "Not Found";
	}
?>