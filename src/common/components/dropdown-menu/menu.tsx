import { View } from '@tarojs/components';

import {
  ReactElement, ReactNode, useEffect, useRef, useState, 
} from 'react';

import { baseUtil, viewUtil } from '@/core/utils';

import DropdownMenuItem from './item';
import { DropdownItem, DropdownMenu, DropdownOption } from './types';

import './index.scss';


interface Props {
  children: ReactElement<DropdownItem>[];
  /**
   * 菜单的 option 值改变时触发
   * @param index menus 序号
   * @param values 选择的选项
   * @returns 
   */
  onChange?: (index: number, values: DropdownOption | DropdownOption[]) => void;
  /**
   * 重置回调
   * @param values 
   * @returns 
   */
  onReset?: (values?: DropdownOption[]) => void;
  /**
   * 确认回调
   * @param values 
   * @returns 
   */
  onConfirm?: (values?: DropdownOption[]) => void;
}

const Menu = (props: Props) => {
  const {
    children = [], onChange, onReset, onConfirm, 
  } = props;

  const uuid = baseUtil.uuid();
  const menuId = useRef(`dropdown-menu-${uuid}`);
  const [top, setTop] = useState(0);
  const [menus, setMenus] = useState<DropdownMenu[]>([]);
  const [openIndex, setOpenIndex] = useState(-1);

  
  useEffect(() => {
    const menusTemp: DropdownMenu[] = [];
    children.forEach((child) => {
      const {
        title, options, value, disabled, 
      } = child.props;
      const menu = {
        title: title ?? options.find(item => item.value === value)?.text,
        actived: false,
        disabled,
      };
      menusTemp.push(menu);
    });
    setMenus(menusTemp);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** 打开下拉菜单 */
  const handleOpen = async (index: number) => {
    // 打开时, 计算下拉菜单显示的位置
    if (openIndex === -1) {
      const [target] = await viewUtil.delayQuerySelector(`#${menuId.current}`, 0);
      setTop(target.top + target.height);
    }
    
    const newMenus = menus.map((menu, idx) => {
      menu.actived = idx === index;
      return menu;
    });
    setMenus(newMenus);
    setOpenIndex(index);
  };

  /** 关闭下拉菜单 */
  const handleHide = () => {
    const newMenus = menus.map((menu) => {
      menu.actived = false;
      return menu;
    });
    setMenus(newMenus);
    setOpenIndex(-1);
  };


  /**
   * 选择项变更回调
   *
   * @param {number} index menus 序号
   * @param {DropdownOption} values 选择的 option
   * @param {string} title menus 标题文案
   * * @param {boolean} isHide 是否隐藏/关闭 menus
   */
  const handleOptionChange = (
    index: number,
    values: DropdownOption | DropdownOption[],
    title?: string,
    isHide: boolean = true,
  ) => {
    // console.log(index, values, title);

    // 更新 menu title
    const newMenus = menus.map((menu, idx) => {
      if (idx === index && title) {
        menu.title = title;
      }
      return menu;
    });

    setMenus(newMenus);
    isHide && handleHide();

    typeof onChange === 'function' && onChange(index, values);
  };


  const renderMenus = (): ReactNode => {
    return menus.map((menu, idx) => {
      return (
        <View
          className={`dropdown-menu__item ${menu.actived ? 'active' : ''} ${menu.disabled ? 'disabled' : ''}`} 
          key={`dropdown-menu-item${idx}`}
          onClick={() => {
            if (menu.disabled) {
              return;
            }
            openIndex === idx ? handleHide() : handleOpen(idx);
          }}
        >
          <View className="dropdown-menu__title">
            <View className="ellipsis">{menu.title}</View>
          </View>
        </View>
      );
    });
  };

  const renderItems = (): ReactNode => {
    return (
      <View className={`dropdown-popup ${openIndex !== -1 ? 'active' : ''}`} style={{ top }}>
        <View
          className="dropdown-popup__overlay"
          onClick={handleHide}
        />
        <View className="dropdown-popup__body">
          {
            children.map((child, idx) => {
              const {
                value, options, multiple, title, disabled, optionsColumns,
              } = child.props;
        
              return (
                openIndex === idx
                && <DropdownMenuItem
                  key={`dropdown-menu-item-${idx}`}
                  value={value}
                  options={options}
                  disabled={disabled}
                  multiple={multiple}
                  optionsColumns={optionsColumns}
                  onChange={(selectIndex, values) => {
                    if (multiple) {
                      const changeOptions = options.filter(it => values?.includes(it.value));
                      handleOptionChange(idx, changeOptions, '', false);
                    } else {
                      const changeOption = options[selectIndex];
                      handleOptionChange(idx, changeOption, !title ? changeOption.text : '');
                    }
                  }}
                  onReset={(values) => {
                    const changeOptions = options.filter(it => values?.includes(it.value));
                    handleOptionChange(idx, changeOptions, '', false);

                    typeof onReset === 'function' && onReset(changeOptions);
                  }}
                  onConfirm={(values) => {
                    const changeOptions = options.filter(it => values?.includes(it.value));
                    handleOptionChange(idx, changeOptions, '', changeOptions.length !== 0);

                    typeof onConfirm === 'function' && onConfirm(changeOptions);
                  }}
                />
              );
            })
          }
        </View>
      </View>
    );
  };

  return (
    <View id={menuId.current} className="dropdown-menu">
      {renderMenus()}
      
      {renderItems()}
    </View>
  );
};

export default Menu;
