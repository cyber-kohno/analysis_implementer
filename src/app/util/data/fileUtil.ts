import Pako from 'pako';
import { get } from 'svelte/store';
import store from '../../store/store';

namespace FileUtil {
    const FILE_EXTENSION: string = '1210.animp';

    /**
     * 文字列を圧縮する
     * @param baseStr 圧縮前の文字列
     * @returns 圧縮後の文字列
     */
    const gZip = (baseStr: string) => {
        const encoder = new TextEncoder(); // 文字列をUint8Arrayにエンコードするために使用
        const textUint8Array = encoder.encode(baseStr);

        // gzip圧縮
        const compressed = Pako.gzip(textUint8Array);// Uint8Array を Base64 文字列に変換
        const compressedBase64 = uint8ArrayToBase64(compressed);
        return compressedBase64;
    }
    // Uint8Array を Base64 にエンコードするヘルパー関数
    const uint8ArrayToBase64 = (buffer: Uint8Array) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    /**
     * 圧縮された文字列を複号する
     * @param baseStr 圧縮された文字列
     * @returns 複号後の文字列
     */
    export const unZip = (baseStr: string) => {
        // Base64 文字列を Uint8Array に戻す
        const compressedFromBase64 = Uint8Array.from(atob(baseStr), c => c.charCodeAt(0));
        return Pako.inflate(compressedFromBase64, { to: 'string' });
    }

    // const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    //     let binary = '';
    //     const bytes = new Uint8Array(buffer);
    //     const len = bytes.byteLength;
    //     for (let i = 0; i < len; i++) {
    //         binary += String.fromCharCode(bytes[i]);
    //     }
    //     return window.btoa(binary);
    // }

    export const base64ToBlob = (base64: string, type: string) => {
        const byteString = atob(base64);
        const arrayBuffer = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
            arrayBuffer[i] = byteString.charCodeAt(i);
        }
        return new Blob([arrayBuffer], { type });
    }

    export const saveProject = () => {
        const {fileHandle, project} = get(store);
        const source = JSON.stringify(project);
        // console.log(source);

        const options: SaveFilePickerOptions = {
            types: [
                {
                    accept: {
                        'text/plain': [`.${FILE_EXTENSION}`],
                    },
                },
            ],
        };

        if (fileHandle != null) {
            (async () => {
                //ファイルへ書き込むための FileSystemWritableFileStream を作成
                const writable = await fileHandle.createWritable();
                //テキストデータの書き込み
                const text = gZip(source);
                await writable.write(text);
                //ファイルを閉じる
                await writable.close();
                alert('The file was saved successfully.');

            })();
        } else {
            window.showSaveFilePicker(options).then((handle) => {
                (async () => {
                    //ファイルへ書き込むための FileSystemWritableFileStream を作成
                    const writable = await handle.createWritable();
                    //テキストデータの書き込み
                    const text = gZip(source);
                    await writable.write(text);
                    //ファイルを閉じる
                    await writable.close();
                    // store.fileHandle = handle;
                    store.update(v => ({...v, fileHandle: handle}))

                })();
            }).catch((e) => {
                console.log(e);
            });
        }
    }

    export const loadProject = () => {
        const options: SaveFilePickerOptions = {
            types: [
                {
                    accept: {
                        'text/plain': [`.${FILE_EXTENSION}`],
                    },
                },
            ],
        };
        (async () => {
            try {
                const [newFileHandle] = await window.showOpenFilePicker(options);
                const file = await newFileHandle.getFile();
                const fileContents = await file.text();
                const text = unZip(fileContents);
                // store.fileHandle = newFileHandle;
                // store.project = JSON.parse(text);
                store.update(v => ({ ...v, fileHandle: newFileHandle, project: JSON.parse(text) }));
            } catch {
            }
        })();
    }
}
export default FileUtil;