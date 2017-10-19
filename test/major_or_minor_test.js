var assert = require('assert');
var majorOrMinor = require('../src/js/major_or_minor');

describe('majorOrMinor', function() {
  it('recognizes C major chord', function() {
    assert.equal('C major', majorOrMinor(["C", "E", "G"]));
  });

  it('recognizes C major 1 inv chord', function() {
    assert.equal('C major 1 inv', majorOrMinor(["E", "G", "C"]));
  });

  it('recognizes C major 2 inv chord', function() {
    assert.equal('C major 2 inv', majorOrMinor(["G", "C", "E"]));
  });

  it('recognizes A minor chord', function() {
    assert.equal('A minor', majorOrMinor(["A", "C", "E"]));
  });

  it('recognizes A minor 1 inv chord', function() {
    assert.equal('A minor 1 inv', majorOrMinor(["C", "E", "A"]));
  });

  it('recognizes A minor 2 inv chord', function() {
    assert.equal('A minor 2 inv', majorOrMinor(["E", "A", "C"]));
  });

  it('recognizes B dim chord', function() {
    assert.equal('B dim', majorOrMinor(["B", "D", "F"]));
  });

  it('recognizes B dim 1 inv chord', function() {
    assert.equal('B dim 1 inv', majorOrMinor(["D", "F", "B"]));
  });

  it('recognizes B dim 2 inv chord', function() {
    assert.equal('B dim 2 inv', majorOrMinor(["F", "B", "D"]));
  });
});
