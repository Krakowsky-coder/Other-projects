package ask.mjpk.model;

import java.util.HashMap;
import java.util.List;

public class ValidationSummary {
  Integer inputsCount;
  Integer outputsCount;
  Integer rowsCount;
  HashMap<String, Boolean> gatesConnected;
  HashMap<String, Boolean> outputsConnected;
  List<String> errors;

  public Integer getInputsCount() {
    return inputsCount;
  }

  public ValidationSummary setInputsCount(Integer inputsCount) {
    this.inputsCount = inputsCount;
    return this;
  }

  public Integer getOutputsCount() {
    return outputsCount;
  }

  public ValidationSummary setOutputsCount(Integer outputsCount) {
    this.outputsCount = outputsCount;
    return this;
  }

  public Integer getRowsCount() {
    return rowsCount;
  }

  public ValidationSummary setRowsCount(Integer rowsCount) {
    this.rowsCount = rowsCount;
    return this;
  }

  public HashMap<String, Boolean> getGatesConnected() {
    return gatesConnected;
  }

  public ValidationSummary setGatesConnected(HashMap<String, Boolean> gatesConnected) {
    this.gatesConnected = gatesConnected;
    return this;
  }

  public HashMap<String, Boolean> getOutputsConnected() {
    return outputsConnected;
  }

  public ValidationSummary setOutputsConnected(HashMap<String, Boolean> outputsConnected) {
    this.outputsConnected = outputsConnected;
    return this;
  }

  public List<String> getErrors() {
    return errors;
  }

  public ValidationSummary setErrors(List<String> errors) {
    this.errors = errors;
    return this;
  }

  public void displayRaport(){
    Boolean hasAnyError = false;
    System.out.println("Plik zostal sparsowany. Rezultaty: ");
    System.out.println("Liczba wierszy: "+this.getRowsCount());
    System.out.println("Liczba wejsc: "+this.getInputsCount());
    System.out.println("Liczba wyjsc: "+this.getOutputsCount());
    if(this.getErrors().size() > 0){
      System.out.println("---------------- Bledy skladniowe:");
      this.getErrors().forEach(System.out::println);
      hasAnyError = true;
    }
    if(this.getGatesConnected().containsValue(false)){
      System.out.println("---------------- Niepolaczone:");
      this.getGatesConnected().forEach((k, v) -> {
        if(!v){
          System.out.println(k + ": " + v);
        }
      });
      hasAnyError = true;
    }
    if(this.getOutputsConnected().containsValue(false)){
      System.out.println("---------------- Wyjscia bez wartosci:");
      this.getOutputsConnected().forEach((k, v) -> {
        if(!v){
          System.out.println(k + ": brak przypisanych wartosci");
        }
      });
    }
    if(!hasAnyError){
      System.out.println("Plik jest poprawny");
    }
  }
}
