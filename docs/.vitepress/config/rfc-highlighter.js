
export default (md) => {
  md.core.ruler.push('must_highlight', (state) => {
    state.tokens.forEach((blockToken) => {
      if (blockToken.type === 'inline') {
        blockToken.children.forEach((token) => {
          if (token.type === 'text') {
            token.content = token.content.replace(/MUST NOT/g, '<span class="must-highlight">MUST NOT</span>');
            token.content = token.content.replace(/MUST/g, '<span class="must-highlight">MUST</span>');
            token.content = token.content.replace(/SHOULD NOT/g, '<span class="should-highlight">SHOULD NOT</span>');
            token.content = token.content.replace(/SHOULD/g, '<span class="should-highlight">SHOULD</span>');
            token.content = token.content.replace(/MAY NOT/g, '<span class="may-highlight">MAY NOT</span>');
            token.content = token.content.replace(/MAY/g, '<span class="may-highlight">MAY</span>');
            token.content = token.content.replace(/RECOMMENDED/g, '<span class="recommended-highlight">RECOMMENDED</span>');
            token.content = token.content.replace(
              /\[DRAFT\]/g,
              '<span class="VPBadge tip">DRAFT</span>'
            );
            token.type = 'html_inline'; // This ensures the content is treated as raw HTML
          }
        });
      }
    });
  });
};