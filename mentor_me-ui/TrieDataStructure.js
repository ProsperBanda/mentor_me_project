// The Trie node class
class TrieNode {
  constructor() {
    this.children = new Map();
    this.isTerminal = false;
  }
}

//Trie class
class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  //Inserting a word into the trie
  insert(word) {
    let currentNode = this.root;

    for (let i = 0; i < word.length; i++) {
      const char = word[i];

      if (!currentNode.children.has(char)) {
        currentNode.children.set(char, new TrieNode());
      }

      currentNode = currentNode.children.get(char);
    }
    currentNode.isTerminal = true;
  }

  //Searching for words matching the given prefix
  search(prefix) {
    let currentNode = this.root;
    const results = [];

    for (let i = 0; i < prefix.length; i++) {
      const char = prefix[i];

      if (!currentNode.children.has(char)) {
        return results;
      }

      currentNode = currentNode.children.get(char);
    }

    this.collectWords(currentNode, prefix, results);

    return results;
  }

  //Function to collect words fromthe Trie
  collectWords(node, prefix, results) {
    if (node.isTerminal) {
      results.push(prefix);
    }

    for (const [char, childNode] of node.children) {
      this.collectWords(childNode, prefix + char, results);
    }
  }
}
