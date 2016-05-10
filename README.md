#A template build framework using expressjs and handlebars

###Requirements:

Node.js 4.0+

~~postgreSQL~~

gulp to minify and compress js and css.

sass


**All dev dependencies can be found in package.json.**

##Setting up for development:
###1. Create github account
###2. Generate ssh key([GitHub_source](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/#generating-a-new-ssh-key),[other_source](https://confluence.atlassian.com/bitbucketserver/creating-ssh-keys-776639788.html#CreatingSSHkeys-CreatinganSSHkeyonLinux&MacOSX)), add to ssh-agent ([source](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/#adding-your-ssh-key-to-the-ssh-agent)) and Add to GitHub Account ([source](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/)).
  * This makes pushing and pulling _alot_ easier as you don't have to enter your username and password each time. It saves valuable time, especially when you're close to a deadline.
####  * You can create an ssh key following these simple steps:
    - NOTE: an ssh key is there to interact with services where you are a registered client with a username and password without you having to type in those details from your command line every time.
   1. If you've never heard of an ssh key and you're working off someone else's computer it's probably best to check if there are any existing ssh keys. If you create a new one for a similar account the existing ssh key might be eliminated unless you make a backup.
      * ssh keys are usually found in a **hidden** folder called **.ssh** in the **root** directory (i.e. the directory you land up in when you type `$ cd `). Check if this folder exists.
        - `$ cd ~/.ssh`
      * ssh keys start with **id_**. check if any keys exist in the **~/.ssh** directory:
        - `$ ls id_*`
      * If any key exists, make a back-up:
        - ```
        $ mkdir key_backup
        $ cp id_rsa* key_backup

          ```
     2. Create a new key (_if there is none that you wish to use_)
        * ```ssh-keygen -t rsa -b 4096 -C "your_email@example.com"```
          - **_Interesting Note:_** The `-t` is to specify the type of algorithm you want to use when creating the key - **rsa** is an acronym of the surnames of the people who invented this specific algorithm - R.L. Rivest, A. Shamir, and L. Adleman ([source](http://people.csail.mit.edu/rivest/Rsapaper.pdf))
             - The `-b` is to specify the length the key must be in bits. GitHub prefers that you use **4096** bits, but if you create your own key, you may choose between a minimum of 768 bits and a maximum of, well, any reasonable magnitude.
             - The `-C` stands for 'comment'. The email address that you put in quotes will be added as a comment to the key, which GitHub will look for (when you add the key as an agent on GitHub) and match with the email address you used to sign-up with.
        * **Select a folder for you key**: You will be asked to select a folder in which the key will be placed. You can **just press enter for the default location** to be chosen.
          - If you choose new location a new hidden .ssh folder will be created, and you can find the key in there.
          - Note however that the folder is hidden, so don't fret when you type `ls` and nothing comes up. If you type `ls -a` all files in the directory will show up, even the hidden ones. The `-a` stands for _**all**_.
        * **Enter passphrase/password for your key**: The command will give you the option to just leave it empty and press enter for no passphrase, but I (and GitHub) suggest that you enter one. Extra security can't do you any harm!
        * **Great! Key created!**: Your key with name **id_rsa.pub** can be found in the hidden **.ssh** folder located either in `~/.ssh/id_rsa.pub`, or **if you specified a new location** `~/path/to/.ssh/id_rsa.pub`.
     3. Add your ssh-key to the ssh-agent
        * Ensure ssh-agent is enabled:
          ```
          # start the ssh-agent in the background
          $ eval "$(ssh-agent -s)"
          //>> Agent pid 59566
          ```
          - If you don't get a similar ouput to above then you can [google](https://www.google.co.za/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=how+to+enable+ssh-agent+linux) and see if you can find something that helps you out.
        * Add key to agent:
          ```
          $ ssh-add ~/.ssh/id_rsa
          $ ssh-add ~path/to/.ssh/id_rsa // if you chose a custom folder path.

          ```
     4. Add key to GitHub account:
         * **NOTE** : GitHub offers a rather convoluted way of copying your key to the clipboard, however it is easier than the alternative, which is to open up the file which you can do via `$ nano ~/path/to/.ssh/id_rsa.pub`, and then simply copy the contents using CTRL+SHFT+C (Linux) [CMD+SHFT+C (Mac)],
         **OR** you can copy and paste the following into your command line (just changing the path where relevant):
         ```
         $ sudo apt-get install xclip
         # Downloads and installs xclip. If you don't have `apt-get`, you might need to use another installer (like          `yum`)

         $ xclip -sel clip < ~/.ssh/id_rsa.pub
         # Copies the contents of the id_rsa.pub file to your clipboard
         ```
         * Once the contents of id_rsa.pub (which is your key) has been copied to your clipboard, you can simply follow the rest of [these instructions](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/) from **number 2 onwards** for pictures, or if you understand words well:

         1. In the top right corner of any page, click your profile photo, then click *Settings*.
         2. In the user settings sidebar, **click SSH and GPG keys**.
         3. **Click New SSH key**.
         4. In the "Title" field, **add a descriptive label for the new key.** For example, if you're using a personal Mac,  you might call this key "Personal MacBook Air".
         5. **Paste** your **key into** the **"Key" field**.
         6. **Click Add SSH key**.
         7. Confirm the action by entering your GitHub password.

###3. Fork repo and `git clone` (making a duplicate) **under _different_ name** :
  * **NB**  To Fork you simply click on **Fork** in the top right-hand corner under your profile picture.
  * **THEN** make sure you select **SSH URL** in between the **Find file** and **Download ZIP** buttons. Copy _**that**_  URL. (_make sure it starts with_ **git@github.com/<your_username>** _as opposed to_ *http://github.com/<your_username>*)
  * *THEN* in your command line paste : `git clone git@github.com/<your_username>/hbs_build_template.git`
    - Note that when you `git clone <git URL> ` **without specifying a folder name** a new folder with the same name of the repository you just cloned will be created i.e. **hbs_build_template**. If you **want a different folder/repository name** then add ` <new_folder_name>` to the above line, so that it looks like this:
    `git clone git@github.com/<your_username>/hbs_build_template.git <new_folder_name>`

###4. Initialise git repository **(only if you have downloaded the ZIP file and _NOT_ forked AND cloned the repository.)**
  1. Create a new repository in your GitHub account under a **_different name_** (i.e. "**My_App**")
  2. Create a new local directory that you will link to the remote repository you just created. It doesn't have to be the same name.
  3. Once created get in the folder: `$ cd ~/path/to/new_directory`
  4. Type `$ git init` in the command line.
  5. Extract the contents from the zip file and paste into this directory.
  6. Copy **SSH URL** from your new repository on GitHub.
  7. Type `$ git add remote origin` in the command line and paste the URL after `origin` so that it looks like this:
  ``$ git add remote origin <SSH URL>``
  8. Press **Enter**.
  Your local repository is now linked with your remote one and you can now push your changes you make locally by typing `$ git push origin <branch>`. Where you see `<branch>`, that is the branch name you will specify. The default branch created initially is called **master** (you can check it out by typing `$ git branch` and you should see that you're in the **master** branch), so you would type
  `$ git push origin master`
  to get going.
  But if you have a **new idea/concept** that you want to work on, but **want to keep a backup of what you have done**, then you should **create a new branch**.
  `$ git branch <new_branch_name>`
  When you do this a new branch of your work is created, and a copy of your work is in that branch.
  Use `$ git branch` to see which branch you're in and `$ git checkout <branch_name>` to get into that branch.
  * NOTE: Make sure you **commit regularly**
    - This means you have to first:
    `$ git add --all` to add all changes you have made to the "staging area", then
    `$ git commit -m "<a comment on changes you have made>"`
    Now you're ready to push.
    `$ git push origin <new_branch_name>` An instance of this branch will automatically be created in your remote repository when you push for the first time.

###Benefits of using Sass ([sourced content](http://sass-lang.com/guide))

-  less to write

-  PARTIALS - can write partial sass files that are great for modularising your css in development.

-  IMPORT - >> you can import partials into a main.css. For example if you want to have all your fonts in one
sass file but then have sass automatically concatenate it into main.css you can save the file with a
leading underscore >> \_fonts.sass << then in main.css you can import it using @import fonts.

 -  VARIABLES - you can use variable names, for e.g., repeating colours. Variable names are declared with a $
 sign and subsequently referenced the same way.

 -  EXTEND SET OF PROPERTIES - if, e.g., we want .success to have the same properties as .message buttons with some more additions, instead of .message .success, you can write .success @extend .message, and sass will render it .message .success for you. This saves you the trouble of keeping tabs of which classes are dependent on each other or not. Also, if you're looking for the attributes of one class you don't have to go scouring for all it's instances. All it's properties are in one place.

-  OPERATORS - allow you to do mathematical operations in css. for, e.g., if you want to create more of a responsive website, then you'd like to use percentages. But it's tedious having to work out the percentages for each height or width of an element. If you are developing a website on a specific size of a screen but you want the same layout for types of screens, then using sass's ability to do mathematical operations you only have to worry about the width and height of your current envirnmont. For example, if you design a nice looking set of buttons next to each other, let's say three, but on a big screen they're larger and on a small screen they're smaller so that they always fit next to each other, then you can simply take their widths in pixels that make them look nice in your environment, divide by the width of your screen in pixels and multiply by 100%! Easy peasy :D
e.g.
```
/\_buttons.sass
.buttons
  display: inline-block
  width: 300px / 960px * 100%
```
Also note form above that with a .sass extension you don't even have to bother with semi-colons OR parentheses! You don't even have to bother with quotes either. For example in a .scss file you'll have to write:
```
/main.scss
@import "buttons";
```
In a .sass file we can simply write
```
/main.sass
@import buttons
```
Makes a difference!

- MIXINS - these are very useful if you want have a set of properties that you might have to repeat but some values may be different.

*Example 1*
```
=border-radius($radius)
  -webkit-border-radius: $radius
  -moz-border-radius:    $radius
  -ms-border-radius:     $radius
  border-radius:         $radius

.box
  +border-radius(10px)
```
*Will render*
```
.box {
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  border-radius: 10px;
}
```
*Example 2*
```
=messageBox($font, $fontSize, $backgrndColour)
  font-family:           $font
  font-size:             $fontSize
  background-colour:     $backgrndColour

.welcome-message
  +messageBox(abel, 18px, green)

.general-message
  +messageBox(sans-serif, 12px, 'pastel yellow')
```
*Will render*
```
.welcome-message {
  font-family:           abel
  font-size:             18px
  background-colour:     green
}

.general-message {
  font-family:           sans-serif
  font-size:             12px
  background-colour:     'pastel yellow'
}
```

-  NESTING - this also makes things easier in development. for example say you have two different tags `h1` and `p` and both belong to `.info` and we also want to add some additional styling to `p`, instead of writing:
```
.info {
  background-color: 'white grey black';
}
.info h1 {
  font-family: abel;
}
.info p {
  font-family: sans-serif;
  background-colour: 'whitesmoke';
}
```
Using a .sass extension we can code:
```
.info
  background-color: 'white grey black'

    h1
      font-family: abel;

    p
      font-family: sans-serif;
      background-colour: 'whitesmoke';
```
And sass will render it to look like the above code we would've written. Neat, right?

*sassMiddleware*
Allows automatic precompilation of your stylesheets when saving while editing in development.
