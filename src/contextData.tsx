/**
 * useContextで使用するグローパルデータ
 */
import React, {createContext} from 'react';

export const navList: string[] = ['Movie', 'History']; //Navigation.tsxで使用

// App.tsxで使用する
export const NavListContext: React.Context<string[]> = createContext<string[]>(navList);
// export const MainContentsContext: React.Context<any> = createContext<any>('');