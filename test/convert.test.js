const fs = require('fs');
const convert = require('../converter/converter');

const testXmlString = fs.readFileSync(__dirname + '/fixtures/base-data.xml').toString();
const testYamlString = fs.readFileSync(__dirname + '/fixtures/base-data.yaml').toString();

const resourceXmlString = fs.readFileSync(__dirname + '/fixtures/resource-example.xml').toString();
const resourceJsonString = fs.readFileSync(__dirname + '/resources/r4/resource-example.json').toString();

describe('Converter base test', () => {
  it('Convert a simple tests from XML to YAML', async () => {
    const data = await convert.testsXmlStringToYamlString(testXmlString, 'r4');
    // "localize" the data for the test to correctly respect the \r\n processing of the platform
    // windows puts in \r\n where mac only does \n (both are compliant)
    expect(data).toEqual(testYamlString.replace(/\r/g, ''));
  });

  it('Convert a simple resource from XML to JSON', async () => {
    const data = await convert.resourceXmlStringToJsonString(resourceXmlString);
    // "localize" the data for the test to correctly respect the \r\n processing of the platform
    // windows puts in \r\n where mac only does \n (both are compliant)
    const localJson = JSON.stringify(JSON.parse(resourceJsonString), null, '  ').replace(/\\r/g, '');
    const localData = data.replace(/\\r/g, '');
    expect(localData).toEqual(localJson);
  });
});
