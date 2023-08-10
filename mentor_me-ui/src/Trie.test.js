import Trie from "./TrieDataStructure";

describe("Trie", () => {
  let trie;

  beforeEach(() => {
    trie = new Trie();
  });

  test("Inserting and searching words", () => {
    trie.insert("apple");
    trie.insert("app");
    trie.insert("banana");
    trie.insert("bat");

    expect(trie.search("app")).toEqual(["app", "apple"]);
    expect(trie.search("bat")).toEqual(["bat"]);
    expect(trie.search("ban")).toEqual(["banana"]);
  });

  test("Searching for non-existing prefix", () => {
    trie.insert("apple");
    trie.insert("banana");

    expect(trie.search("bat")).toEqual([]);
  });

  test("Search with an empty string should return all words", () => {
    trie.insert("apple");
    trie.insert("banana");

    expect(trie.search("")).toEqual(["apple", "banana"]);
  });
});
