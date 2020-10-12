# vscode-react-docgen-typescript

## Features

Generate TS React component document to clipboard

![copyDemo](https://img.alicdn.com/tfs/TB1u9TTiSslXu8jSZFuXXXg7FXa-1084-762.gif)

Insert TS React component documentation in Markdown

![insertDemo](https://img.alicdn.com/tfs/TB1UVBli5DsXe8jSZR0XXXK6FXa-1084-762.gif)

Convert the following Component:

``` ts
import * as React from "react";
import { Component } from "react";

/**
 * Column properties.
 */
export interface IColumnProps {
  /**
   * prop1 description
   * @default "red"
   */
  prop1?: string;
  /**
   * prop2 description
   * @see https://fusion.alibaba-inc.com/
   */
  prop2: number;
  /**
   * prop3 description a | b
   */
  prop3: () => void;
  /** prop4 description 😄 */
  prop4: "option1" | "option2" | "option3";
}

/**
 * Form column.
 */
export class Column extends Component<IColumnProps> {
  render() {
    return <div>Test</div>;
  }
}
```

Into

``` markdown
### Column

Form column.

#### Props

| Name               | Type                                | Default value | Description                                                 |
| ------------------ | ----------------------------------- | ------------- | ----------------------------------------------------------- |
| prop1              | string                              | "red"         | prop1 description                                           |
| prop2 _(required)_ | number                              |               | prop2 description @see https&#x3A;//fusion.alibaba-inc.com/ |
| prop3 _(required)_ | () => void                          |               | prop3 description a \| b                                    |
| prop4 _(required)_ | "option1" \| "option2" \| "option3" |               | prop4 description 😄                                        |
```
## Release Notes

### 1.0.6

- feat: support filterNodeModules

### 1.0.5

- feat: support switch language

### 1.0.4

- docs: add README

### 1.0.3

- fix: Typescript dependency

### 1.0.2

- feat: Insert TS React component documentation in Markdown

### 1.0.0

- feat: Generate TS React component document to clipboard

### For more information

* [react-docgen-typescript](https://github.com/styleguidist/react-docgen-typescript)

**Enjoy!**
