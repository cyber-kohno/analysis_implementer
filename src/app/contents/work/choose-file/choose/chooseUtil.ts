import type StoreFileChoose from "../../../../store/work/storeFileChoose";

namespace ChooseUtil {
  export const getDispRecords = (
    root: StoreFileChoose.UsableNode,
    isFlat: boolean,
  ): StoreFileChoose.NodeDispProps[] => {
    return !isFlat ? buildTreeChooser(root) : buildFlatChooser(root);
  };

  const buildTreeChooser = (root: StoreFileChoose.UsableNode): StoreFileChoose.NodeDispProps[] => {
    const list: StoreFileChoose.NodeDispProps[] = [];

    const rec = (
      node: StoreFileChoose.UsableNode,
      indents: StoreFileChoose.NodeIndent[],
      isOpen: boolean,
    ): [number, number] => {
      if (isOpen) {
        list.push({
          indents,
          node,
          seq: list.length,
        });
      }
      let [fileCnt, selectCnt] = [0, 0];
      if (node.child != undefined) {
        const child = node.child;
        [child.fileCnt, child.selectCnt] = [0, 0];
        const nodes = node.child.nodes;
        nodes.forEach((n, i) => {
          const nextIndents: StoreFileChoose.NodeIndent[] = indents.slice();
          // 自身がlastの場合、子要素はnoneにする
          if (nextIndents[nextIndents.length - 1] === "last")
            nextIndents[nextIndents.length - 1] = "none";
          nextIndents.push(
            (() => {
              if (i === nodes.length - 1) return "last";
              else return "middle";
            })(),
          );
          const [cFileCnt, cSelectCnt] = rec(
            n,
            nextIndents,
            isOpen && child.isOpen,
          );
          child.fileCnt += cFileCnt;
          child.selectCnt += cSelectCnt;
        });
        fileCnt += child.fileCnt;
        selectCnt += child.selectCnt;
      } else {
        fileCnt++;
        selectCnt += node.isSelected ? 1 : 0;
      }
      return [fileCnt, selectCnt];
    };
    rec(root, [], true);

    return list;
  };
  const buildFlatChooser = (root: StoreFileChoose.UsableNode) => {
    const list: StoreFileChoose.NodeDispProps[] = [];

    const rec = (node: StoreFileChoose.UsableNode) => {
      if (node.child == undefined) {
        list.push({
          indents: [],
          node,
          seq: list.length,
        });
      } else {
        node.child.nodes.forEach((n) => rec(n));
      }
    };
    if (root.child == undefined) throw new Error();

    root.child.nodes.forEach((n) => rec(n));
    return list;
  };

  export const getSelectedFiles = (root: StoreFileChoose.UsableNode) => {
    const list: string[] = [];

    const rec = (node: StoreFileChoose.UsableNode) => {
      if (node.child == undefined) {
        // 選択中のアイテムのみ追加
        if (node.isSelected) {
          list.push(node.path.replace(root.path, ''));
        }
      } else {
        node.child.nodes.forEach((n) => rec(n));
      }
    };
    if (root.child == undefined) throw new Error();

    root.child.nodes.forEach((n) => rec(n));
    return list;
  };
}
export default ChooseUtil;
