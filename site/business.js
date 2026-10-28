/* Public configuration only. NEVER put credentials in this file. */
(async function () {
  const safe = value => {const node = document.createElement('span'); node.textContent=String(value??''); return node.textContent;};
  let config={}, articles=[];
  try { const r=await fetch('business-config.json'); if(r.ok) config=await r.json(); } catch(e) { /* file:// preview has limited fetch support */ }
  try { const r=await fetch('articles.json'); if(r.ok) articles=await r.json(); } catch(e) {}
  const checkout=document.getElementById('product-checkout');
  if(checkout && config.product_checkout_url && /^https:\/\//.test(config.product_checkout_url)) {
    checkout.href=config.product_checkout_url; checkout.textContent='Get the Room Reset Kit ↗'; checkout.rel='noopener noreferrer';
  }
  const articleCards=document.getElementById('article-cards');
  if(articleCards && articles.length){articleCards.replaceChildren();for(const a of articles.slice(0,6)){
    const card=document.createElement('article'),title=document.createElement('h3'),p=document.createElement('p'),link=document.createElement('a');
    title.textContent=safe(a.title);p.textContent=safe(a.description);link.textContent='Read the guide ↗';link.href=a.url;card.append(title,p,link);articleCards.append(card);
  }}
  const affiliateCards=document.getElementById('affiliate-cards');
  if(affiliateCards && Array.isArray(config.affiliate_offers)){
    for(const item of config.affiliate_offers){if(!item.reviewed || !/^https:\/\//.test(item.url||''))continue;
      const card=document.createElement('article'),h=document.createElement('h3'),p=document.createElement('p'),link=document.createElement('a'),notice=document.createElement('small');
      h.textContent=safe(item.name);p.textContent=safe(item.description);link.textContent='View product ↗';link.href=item.url;link.rel='sponsored nofollow noopener noreferrer';link.target='_blank';notice.textContent='Advertisement / affiliate link';card.append(h,p,notice,document.createElement('br'),link);affiliateCards.append(card);
    }
  }
})();
