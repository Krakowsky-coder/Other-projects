package ask.mjpk.parser;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class IscasParser {
  private final File file;
  private final Scanner reader;

  public IscasParser(String filePath) throws FileNotFoundException {
    this.file = new File(filePath);
    this.reader = new Scanner(this.file);
  }

  public List<String> read(){
    List<String> rows = new ArrayList<>();
    while(this.reader.hasNextLine()){
      rows.add(this.reader.nextLine());
    }
    return rows;
  };
}
