interface XmlConverter<T> {
  convert: (xml: string, tagName: string) => T,
  convertList: (xml: string, tagName: string) => T[]
}

export abstract class AbstractXmlConverter<T> implements XmlConverter<T>{
  public convert(xml: string, tagName: string): T{
    const body = this.converterToBody(xml);
    const entityBody = body.getElementsByTagName(tagName).item(0);
    return this.createEntity(entityBody);
  }

  public convertList(xml: string, tagName: string): T[]{
    const body = this.converterToBody(xml);
    const entitiesBody = body.getElementsByTagName(tagName);
    return this.createEntities(entitiesBody);
  }

  private converterToBody(xml: string): Element{
    const parser = new DOMParser();
    return <Element>parser.parseFromString(xml, "application/xml")
      .getElementsByTagName('SOAP-ENV:Body').item(0);
  }

  public abstract createEntity(body: Element | null): T;

  public createEntities(body: HTMLCollectionOf<Element> | null): T[]{
    const entities: T[] = [];
    // @ts-ignore
    for (let i = 0; i < body.length; i++) {
      // @ts-ignore
      const entityBody = body.item(i);
      entities.push(this.createEntity(entityBody));
    }
    return entities;
  }

}
