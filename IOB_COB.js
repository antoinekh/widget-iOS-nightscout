// Nightscout Widget
//
// Copyright (C) 2020 by niepi <niepi@niepi.org>
//
// Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
// INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER
// IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE
// OF THIS SOFTWARE.
const nsUrl ='https://XXxx'; // your nightscout url
const nsToken =`your-token`; // your nightscoutaccess token
const glucoseDisplay = `mgdl`;
//const glucoseDisplay = ` mmoll`;
const dateFormat  = `fr-FR`;

// Initialize Widget
let widget = await createWidget();
if (!config.runsInWidget) {
    await widget.presentSmall();
}
Script.setWidget(widget);
Script.complete();

// Build Widget
async function createWidget(items) {
    const list = new ListWidget();
    let iob_cob, updated;
    
    let nsDataV2 = await getNsDataV2();
   
    let tiob = nsDataV2.iob;
    let tcob = nsDataV2.cob;
	

    iobcob = list.addText("" + tiob + "  ");
    iobcob.font = Font.mediumSystemFont(20);
    iobcob = list.addText("" + tcob);
    iobcob.font = Font.mediumSystemFont(20);
    list.setPadding(40, 15, 40, 0);
    
    let updateTime = new Date(nsDataV2.mills).toLocaleTimeString(dateFormat, { hour: "numeric", minute: "numeric" })
    updated = list.addText("" + updateTime);
    updated.font = Font.mediumSystemFont(8); 
     
    list.refreshAfterDate = new Date(Date.now() + 30);
    return list;
}

async function getNsDataV2() {
    let url = nsUrl + "/api/v2/properties?&token=" + nsToken;
    let data = await new Request(url).loadJSON();
	  return {
		iob: data.iob.displayLine,
    		cob: data.cob.displayLine,
		mills: data.bgnow.mills
        
    };
    
}
