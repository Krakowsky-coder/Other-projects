package ask.mjpk;

import ask.mjpk.model.ValidationSummary;
import ask.mjpk.parser.IscasParser;
import ask.mjpk.validator.IscasValidator;

import java.io.FileNotFoundException;
import java.util.List;

public class Main {

  public static void main(String[] args) throws FileNotFoundException {
    IscasParser parser = new IscasParser("s27.bench");
    List<String> rows = parser.read();
    IscasValidator validator = new IscasValidator(rows);
    validator.validate().getSummary().displayRaport();
  }
}
