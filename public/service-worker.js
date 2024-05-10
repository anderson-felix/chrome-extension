/* eslint-disable no-undef */
let folder = 'first-panel';

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'openSidePanel',
    title: 'Open side panel',
    contexts: ['all']
  });
  chrome.tabs.create({ url: 'home/index.html' });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'openSidePanel') {
    // This will open the panel in all the pages on the current window.
    chrome.sidePanel.open({ windowId: tab.windowId });
  }
});

chrome.runtime.onMessage.addListener((message, sender) => {

  // The callback for runtime.onMessage must return falsy if we're not sending a response
  (async () => {
    if (message.type === 'open_side_panel') {
      // This will open a tab-specific side panel only on the current tab.
      await chrome.sidePanel.open({ tabId: sender.tab.id });
      await chrome.sidePanel.setOptions({
        tabId: sender.tab.id,
        path: `${folder}/index.html`,
        enabled: true
      });

    }
  })();
});

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {


  if (tab.title.match(/(tv|smart)/gi))
    chrome.sidePanel.setOptions({
      tabId: tabId,
      path: `tv-smart/index.html`,
      enabled: true
    });

  if (tab.title.match(/(mic|audio|som|microfone)/gi))
    chrome.sidePanel.setOptions({
      tabId: tabId,
      path: `mic/index.html`,
      enabled: true
    });

  if (tab.title.match(/(plantas|planta|jardim|verde)/gi))
    chrome.sidePanel.setOptions({
      tabId: tabId,
      path: `plant/garden-index.html`,
      enabled: true
    });


});

chrome.identity.getProfileUserInfo(function (userInfo) {
  console.log(`Nome de usuário`, userInfo.username);
  console.log(`Email`, userInfo.email);
  console.log('userInfo: ', JSON.stringify({ userInfo }, null, 4));
});

chrome.history.search({ text: '', maxResults: 100 }, function (historyItems) {
  console.log('historyItems: ', historyItems);
});

