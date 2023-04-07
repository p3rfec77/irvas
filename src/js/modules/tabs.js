import { event } from "jquery";

const glazingSelectors = {
    headerSelector: '.glazing_slider',
    tabsSelector: '.glazing_block',
    tabsContentSelector: '.glazing_content',
    activeClass: 'active',
}

const decorationSelectors = {
    headerSelector: '.decoration_slider',
    tabsSelector: '.no_click',
    tabsContentSelector: '.decoration_content > div > div',
    activeClass: 'after_click',
}

const tabs = ({headerSelector, tabsSelector, tabsContentSelector, activeClass}) => {
    const header = document.querySelector(headerSelector);
    const tabs = document.querySelectorAll(tabsSelector);
    const tabsContent = document.querySelectorAll(tabsContentSelector);

    const hideTabContent = () => {
        tabsContent.forEach(content => {
            content.style.display = 'none';
        })

        tabs.forEach(tab => {
            tab.classList.remove(activeClass);
        })
    }

    const showTabContent = (i = 0) => {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add(activeClass);
    }
    
    hideTabContent();
    showTabContent();

   
    const findCorrectTab = "(target.classList.contains(tabsSelector.replace(/\./, '')) || target.parentNode.classList.contains(tabsSelector.replace(/\./, '')))";

   const changeTabs = (action) => { header.addEventListener(action, (e) => {
        const target = e.target;
        if (target && findCorrectTab.replaceAll('"', '') || (e.key === 'Enter')) {
            tabs.forEach((tab, i) => {
                if (target == tab || target.parentNode == tab) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    })
   }

    changeTabs('click');
    changeTabs('keypress');
};

export {glazingSelectors, decorationSelectors, tabs};
