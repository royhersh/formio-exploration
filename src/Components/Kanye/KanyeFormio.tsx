import { Components } from '@formio/js';
import React from 'react';
import ReactDOM from 'react-dom';
import Kanye from './Kanye';

const FieldComponent = Components.components.field;

class KanyeFormio extends FieldComponent {
  static schema() {
    return FieldComponent.schema({
      type: 'kanyequote',
      label: 'Kanye Quote',
      key: 'kanyequote',
      input: false,
      tableView: false,
    });
  }

  static get builderInfo() {
    return {
      title: 'Kanye Quote',
      group: 'basic',
      icon: 'bi bi-chat-quote',
      weight: 70,
      documentation: 'A component that displays random Kanye West quotes',
      schema: KanyeFormio.schema(),
    };
  }

  attachReact(element: HTMLElement): void {
    ReactDOM.render(<Kanye />, element);
  }

  detachReact(element: HTMLElement | null): void {
    if (element) {
      ReactDOM.unmountComponentAtNode(element);
    }
  }

  attach(element: HTMLElement): Promise<unknown> {
    this.attachReact(element);
    return super.attach(element);
  }

  detach(element: HTMLElement): void {
    this.detachReact(element);
    return super.detach(element);
  }
}

// Register the component with Form.io
Components.addComponent('kanyequote', KanyeFormio);

export default KanyeFormio;
