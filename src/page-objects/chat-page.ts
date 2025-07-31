const chatPageSelectors = {
  messageSection: {
    messageTextbox: { name: 'Write a message...' },
    sendQuestionBtn: '#send-question',
    askBtn: { name: 'Ask' },
    loader: '.px-8',
  },
 messagesViewSection: {
  messagesTextfield: 'div.user-response[data-render-message-options-last-message="true"]',
},
  askSection: {
    suggestionBox: 'div.bg-[#1d1e36]',
  },
};

export default chatPageSelectors;
