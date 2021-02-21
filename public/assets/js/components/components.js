class ComponentsApp {
    sliderComponent(settings, nodes) {
        const sets = {
            auto: "false",
            loop: "false",
            speed: "10000",
            gap: "30",
            nav: "true",
            dots: "false",
            item: "1",
            'item-xs': "2",
            'item-sm': "3",
            'item-md': "4",
            'item-lg': "5",
            'item-xl': "6",
            duration: "1000",
            mousedrag: "on",
            ...settings,
        }

        let properties = '';
        for (const key in sets) {
            if (Object.hasOwnProperty.call(sets, key)) {
                const element = sets[key];
                properties += `data-owl-${key}="${element}" `
            }
        }
        return `
            <div class="ps-carousel--nav owl-slider" ${properties}>
                ${nodes}
            </div>
        `;
    }

    successComponent(alertData) {
        // container-thanks
        let iconText = 'fa fa-check-circle',
            alertClass = 'text-success',
            textClass = 'text-success';

        if (!alertData.isSuccess) {
            textClass = 'text-danger';
            iconText = 'fa fa-exclamation-circle';
        }
        return `
            <div class="row justify-content-center align-content-center">
                
                <div class="col-12 text-center">
                    <div class="w-100 mt-5">
                        <i class="${iconText} ${textClass} fa-5x d-block"></i>
                        <h2 class="mb-3">${alertData.headerH2}</h2>
                        ${alertData.headerHtml || ''}
                    </div>
                    
                    <div class="w-100 mt-3">
                        ${alertData.content}
                    </div>
                </div>
            </div>
        `;
    }
}