# Documentation for NSE Lab

The `/docs` folder contains the contents of the website
[nse.digital](http://nse.digital). Markdown files in `/docs` are automatically
generated as HTML files on the website. The home page of the website is
`/docs/README.md`. The website uses the Jekyll theme
[Just The Docs](https://pmarsceill.github.io/just-the-docs/). It should be quite
clear from looking through the `/docs` folder how the site works and is
structured, but
[this](https://pmarsceill.github.io/just-the-docs/docs/navigation-structure/)
page in the Just The Docs documentation should help explain things in detail.

## Contributing

If you want to contribute to the documentation on the website please make a pull
request. You can contact [Pontus](https://github.com/pontusj101) to review your pull request.

## Local development
In the `/docs` directory, run the following commands:

```
sudo gem install jekyll bundler
bundle exec jekyll serve
```

### Docker
In this directory do the following commands:

```
sudo docker build -t work_web .
docker run -p 4000:4000 -ti --rm --name work_web_container work_web
```

The server is now accessible at http://localhost:4000/

## Requirements for Google Sheets Integration
This feature allows to fetch available lab equipment from google sheets. It also allows students to book the equipment by automatically posting a comment on the sheet for the required device. The following gif, showcases the final feature in action. ![feature gif](images/feature_gif.gif)
- A google project is required for integrating this feature.![new google project](images/new_google_project.png) 
- Enable Google Sheets Api and Google Drive api to this project.![enable google sheets api](images/google_sheets_api-enable.png)![enable google drive api](images/google_drive_api-enable.png)
- You need a google sheet, ideally with shared link where anyone can comment.![shared link](images/shared_link_google_sheets.png) 
- Finally you need a client-id and an api key. To get these, refer to the IAM tab in the google cloud console.![google credentials IAM](images/google_credentials_iam.png) ![google credentials IAM](images/google_credentials_iam2.png)

Note that for the last step, it is recommended to set restrictions on the api key, and to set the allowed origin from the client. ![api key restrictions](images/api_key_restrictions.png) 
![client allowed origins](images/allowed_origins_client.png)

Adjusting quotas is advised for further control.

