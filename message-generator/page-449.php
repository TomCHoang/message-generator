<html lang="en-US">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" href="/wp-content/themes/tomhoangdesign/favicon.ico" type="image/x-icon"> 
        <title>Message Generator - Tom Hoang Design</title>

        <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1">
        <link rel="canonical" href="https://tomhoangdesign.com/message-generator/">
        <meta property="og:locale" content="en_US">
        <meta property="og:type" content="article">
        <meta property="og:title" content="Message Generator - Tom Hoang Design">
        <meta property="og:url" content="https://tomhoangdesign.com/message-generator/">
        <meta property="og:site_name" content="Tom Hoang Design">
    </head>

    <body>
        <section class="jumbotron text-center">
            <div class="container">
                <h1 class="jumbotron-heading">Message Generator</h1>
                <p></p>
                <p class="lead text-muted">
                    Automatically populating customizable messages with templates. Simply change the prompt to your message and upload a json file with your inputs. Examples of the json files for the default prompt can be found below. You will want to upload to new table with the Guest.json first then upload to existing table with the Companies.json.
                </p>
                <p>&nbsp;</p>
                <p>
                    <a href="/wp-content/themes/tomhoangdesign/Guests.json" class="btn btn-primary" download>Download Demo Input File 1</a>
                    <a href="/wp-content/themes/tomhoangdesign/Companies.json" class="btn btn-primary" download>Download Demo Input File 2</a>
                </p>
            </div>
        </section>

        <div class="container py-3">
            <label class="h2" for="prompt">Prompt</label>
            <div class="message-generator-prompt"></div>
        </div>

        <hr />

        <div class="container py-3">
            <h2>Inputs</h2>
            <p>Upload your file to populate the table.</p>
            <p>Use the "Upload to New Table" button to clear the table and populate the table.</p>
            <p>Use the "Upload to Existing Table" to update the table with the json file. This will only update existing columns. The id will correspond to the table row.</p>
            <div class="message-generator-input-form"></div>
            <div class="message-generator-input-table"></div>
        </div>

        <hr />

        <div class="container py-5">
            <h2>Results</h2>
            <div class="message-generator-results"></div>
        </div>

        <hr />

        <footer class="text-muted bg-light py-5">
            <div class="container">
                <div>Tom Hoang</div>
            </div>
        </footer>

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="https://tomhoangdesign.com/wp-content/themes/tomhoangdesign/message-generator.css" type="text/css">
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <script type="text/javascript" src="https://tomhoangdesign.com/wp-content/themes/tomhoangdesign/class.message-generator.js"></script>
    </body>
</html>
