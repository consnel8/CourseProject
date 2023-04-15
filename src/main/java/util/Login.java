package util;

import java.io.*;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.*;
import java.io.File;
import java.io.IOException;


public class Login {
    
    //create the file and maps for the logins
    private File directory = null;
    Map<String, String> logins = new TreeMap<>();
    URL loginURL = this.getClass().getClassLoader().getResource("/data/logins");
    File fileName = createDirectory(loginURL);


    //keep track of who is logged in
    List<String> currentlyLoggedIn = new ArrayList<String>();
    Login(File dir) throws FileNotFoundException {
        this.directory = dir;
    }
    
    //goes through the database and populates the map with logins
    public void populateLogins() throws FileNotFoundException {

        //create map of logins from database

        if(fileName.exists())
        {
            Scanner scanner  = new Scanner(fileName);
            while(scanner.hasNext()){
                // ignore the casing for words
                String word = scanner.next();
                int spaceIndex = word.indexOf(' ');

                logins.put(word, scanner.next());
            }
        }

    }


    //given a username and password, check if user password combination exists and is correct
    public boolean checkLogin(String username, String password) throws IOException, InterruptedException {
        //Checks if the password entered matches their profile password for their given username and checks if the user is already logged into the server
        //Also removes any spaces entered in their username section

        if(logins.containsKey(username))
        {
            if(logins.get(username) == password)
            {
                System.out.print("Login Success!");
                return true;
            }
        }

        return false;

    }

    //add a new user to the database file as well as add it to map of logins
    public void addUser(String user, String pass) throws IOException {
        FileWriter W = new FileWriter(new File(fileName.toURI()), true);
        W.write("\n");
        W.write(user + " " + pass);
        W.close();

        //Adds the new username and password combination to the map
        logins.put(user, pass);
    }




    //create a file directory out of the given path
    private File createDirectory(URL url){
        File dir = null;
        try {
            dir = new File(url.toURI());

        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
        return dir;
    }
}
