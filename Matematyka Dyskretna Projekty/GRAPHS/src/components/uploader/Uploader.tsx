import React, { ChangeEvent } from "react";
import { Graph, GraphType, GraphConnection } from "../../models/Graph.model";

interface IUploaderProps {
  onGraphCreate: (graph: Graph) => void;
}

export class Uploader extends React.Component<IUploaderProps> {
  constructor(props: any) {
    super(props);
    this.handleGraphCreate = this.handleGraphCreate.bind(this);
  }

  handleGraphCreate(graph: Graph) {
    this.props.onGraphCreate(graph);
  }

  fileUploaded(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const reader = new FileReader();

    reader.onload = async (ev) => {
      let fileSection = 0;
      let lastSetIndex = 0;

      const graphModel = new Graph();
      const text = ev.target?.result;

      let textArray = text?.toString().split("\n");
      console.log(textArray);
      if (textArray !== undefined) {
        textArray.forEach((row, i, arr) => {
          if (
            row[0] !== "#" &&
            row[0] !== " " &&
            row.length > 1 &&
            row[0] !== "\n"
          ) {
            switch (fileSection) {
              case 0:
                lastSetIndex = i;
                graphModel.name = row.substr(row.indexOf("=") + 1);
                break;
              case 1:
                lastSetIndex = i;
                graphModel.type = row.substr(row.indexOf("=") + 1) as GraphType;
                break;
              case 2:
                lastSetIndex = i;
                graphModel.verticesCount = parseInt(row);
                break;
              case 3:
                lastSetIndex = i;
                graphModel.verticesIds.push(row.replace(/[\r\n]+/gm, ''));
                break;
              case 4:
                lastSetIndex = i;
                graphModel.edgesIds.push(row.replace(/[\r\n]+/gm, ''));
                break;
              case 5:
                lastSetIndex = i;
                const coord = row.split(",").map(x => x.replace('<', '').replace('>', '').replace(/[\r\n]+/gm, ''));
                graphModel.connections.push({
                  x: coord[0],
                  y: coord[1],
                } as GraphConnection);
                break;
            }

            if (arr.length > i + 1 && lastSetIndex === i) {
              if (
                arr[i + 1][0] === "#" ||
                arr[i + 1][0] === " " ||
                arr[i + 1].length <= 1 ||
                arr[i + 1][0] === "\n"
              ) {
                fileSection++;
              }
            }
          }
        });

        this.handleGraphCreate(graphModel);
      }
    };

    if (e.target.files !== null) {
      reader.readAsText(e.target?.files?.[0]);
    }
  }

  render() {
    return (
      <div>
        <input
          type="file"
          name="inputStruct"
          accept="txt"
          onChange={(e) => this.fileUploaded(e)}
        />
      </div>
    );
  }
}
