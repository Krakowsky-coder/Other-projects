package ask.mjpk.validator;

import ask.mjpk.model.LogicalTypes;
import ask.mjpk.model.ValidationSummary;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

public class IscasValidator {
  private final List<String> rows;
  private final HashMap<String, Boolean> inputsConnected = new HashMap<>();
  private final HashMap<String, Boolean> outputsConnected = new HashMap<>();
  private final List<String> logicalTypeErrors = new ArrayList<>();
  private Integer inputsCount = 0;
  private Integer outputsCount = 0;

  public IscasValidator(List<String> rows){
    this.rows = rows;
  }

  public IscasValidator validate(){
    final int[] idx = {1};
    this.rows.forEach(row -> {
      if(!isRowEmpty(row)){
        String tRow = removeSpaces(row);
        if(!isComment(tRow)) {
          String[] dividedRow = splitRow(tRow);
          checkIfInputsConnected(dividedRow, idx[0]);
          checkIfOutputsConnected(dividedRow);

        }
      }
      idx[0]++;
    });
    return this;
  }

  public ValidationSummary getSummary(){
    return new ValidationSummary()
            .setErrors(logicalTypeErrors)
            .setGatesConnected(inputsConnected)
            .setOutputsConnected(outputsConnected)
            .setInputsCount(inputsCount)
            .setOutputsCount(outputsCount)
            .setRowsCount(rows.size());
  }

  private void checkIfInputsConnected(String[] row, Integer idx){
    if(row[0].equalsIgnoreCase(LogicalTypes.INPUT.name()) || row[0].equalsIgnoreCase(LogicalTypes.OUTPUT.name())){
      inputsConnected.put(row[1], true);
      if(row[0].equalsIgnoreCase(LogicalTypes.INPUT.name())){
        inputsCount++;
      }
      if(row[0].equalsIgnoreCase(LogicalTypes.OUTPUT.name())){
        outputsCount++;
      }
    }else if(row[0].charAt(0) != 'G'){
      pushStringError(idx, row[0]);
    }
    if(row[0].charAt(0) == 'G'){
      inputsConnected.put(row[0], true);
      if(isMultiVal(row[1])){
        if(!inputsConnected.containsKey(row[2])){
          inputsConnected.put(row[2], false);
        }
        if(!inputsConnected.containsKey(row[3])){
          inputsConnected.put(row[3], false);
        }
      }else if(isAnyOfLogicalTypes(row[1])){
        if(!inputsConnected.containsKey(row[2])){
          inputsConnected.put(row[2], false);
        }
      }else{
        pushStringError(idx, row[1]);
      }
    }
  }

  private void checkIfOutputsConnected(String[] row){
    if(row[0].equalsIgnoreCase(LogicalTypes.OUTPUT.name())){
      outputsConnected.put(row[1], false);
    }
    if(row[0].charAt(0) == 'G') {
      if(outputsConnected.containsKey(row[0])){
        outputsConnected.put(row[0], true);
      }
    }
  }

  private Boolean isRowEmpty(String row) {
    return row.isEmpty() || row.isBlank();
  }

  private String removeSpaces(String row){
    return row.replaceAll("\s", "");
  }

  private Boolean isComment(String row){
    return row.charAt(0) == '#';
  }

  private String[] splitRow(String row){
    return row.replaceAll("\\(", "_").replaceAll("\\)", "").split("(=)|(_)|(,)");
  }

  private Boolean isMultiVal(String logicalType){
    return logicalType.equalsIgnoreCase(LogicalTypes.AND.name()) ||
            logicalType.equalsIgnoreCase(LogicalTypes.NAND.name()) ||
            logicalType.equalsIgnoreCase(LogicalTypes.OR.name()) ||
            logicalType.equalsIgnoreCase(LogicalTypes.NOR.name()) ||
            logicalType.equalsIgnoreCase(LogicalTypes.XOR.name());
  }

  private Boolean isAnyOfLogicalTypes(String logicalType){
    return Arrays.stream(LogicalTypes.values()).anyMatch(type -> type.name().equalsIgnoreCase(logicalType));
  }

  private void pushStringError(Integer idx, String namingError){
    this.logicalTypeErrors.add("Linia "+idx+": Nie rozpoznano operacji '"+namingError+"', sprawdz pisownie");
  }

}
