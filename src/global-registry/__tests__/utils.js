import { transformEntityTypesResponse } from '../utils'

describe('transformEntityTypesResponse()', () => {
  it('is defined', () => {
    expect(transformEntityTypesResponse).toEqual(expect.any(Function))
  })

  it('correctly transforms GET /entity_types response', () => {
    const response = require(window.fixturesRoot + '/GET-entity_types.json')
    const result = transformEntityTypesResponse(response['entity_types'])
    expect(result).toHaveLength(5)

    // Should contain person, _relationship and _enum_values
    expect(result).toContainEqual(expect.objectContaining({id: 'f45f9632-5bbf-11e9-bca9-784f4350fb53'}))
    expect(result).toContainEqual(expect.objectContaining({id: 'f531c116-5bbf-11e9-bca9-784f4350fb53'}))
    expect(result).toContainEqual(expect.objectContaining({id: 'f487eefc-5bbf-11e9-bca9-784f4350fb53'}))

    // Should not contain duplicates (children of _relationship and _enum_values)
    expect(result).not.toContainEqual(expect.objectContaining({id: 'f53309e0-5bbf-11e9-bca9-784f4350fb53'}))
    expect(result).not.toContainEqual(expect.objectContaining({id: 'f5365398-5bbf-11e9-bca9-784f4350fb53'}))
    expect(result).not.toContainEqual(expect.objectContaining({id: 'f49c19fe-5bbf-11e9-bca9-784f4350fb53'}))
    expect(result).not.toContainEqual(expect.objectContaining({id: 'f4c7dbd4-5bbf-11e9-bca9-784f4350fb53'}))
    expect(result).not.toContainEqual(expect.objectContaining({id: 'f5158afa-5bbf-11e9-bca9-784f4350fb53'}))
  })
})
