// 1.3.3.1 热销产品数据
const hotProducts = [
    { id: 1, name: "氮化镓充电器", sales: 1250, time: "近一周", totalSales: 1048, salesData: [120, 132, 101, 134, 290, 230] },
    { id: 2, name: "Type-C扩展坞", sales: 980, time: "近一周", totalSales: 735, salesData: [220, 182, 191, 234, 290, 330] },
    { id: 3, name: "蓝牙耳机", sales: 756, time: "近一周", totalSales: 580, salesData: [150, 232, 201, 154, 190, 330] }
];

// 1.3.3.2 和 1.3.3.3 图表初始化
document.addEventListener('DOMContentLoaded', function() {
    // 渲染热销产品列表
    renderHotProducts();
    
    // 初始化销售趋势图
    initSalesTrendChart();
    
    // 初始化销售占比饼图
    initSalesPieChart();
    
    // 初始化轮播图自动播放和悬停控制
    initCarousel();
    
    // 1.4 jQuery特效
    initJQueryEffects();
    
    // 1.5 动态效果和提示
    initDynamicEffects();
});

// 新增：初始化轮播图
function initCarousel() {
    const carousel = document.getElementById('mainCarousel');
    if (!carousel) return;
    
    const carouselInstance = new bootstrap.Carousel(carousel, {
        interval: 3000, // 3秒自动切换
        ride: 'carousel',
        wrap: true
    });
    
    // 鼠标悬停暂停轮播
    carousel.addEventListener('mouseenter', function() {
        carouselInstance.pause();
    });
    
    // 鼠标离开恢复轮播
    carousel.addEventListener('mouseleave', function() {
        carouselInstance.cycle();
    });
    
    // 初始化自动轮播
    carouselInstance.cycle();
}

// 渲染热销产品列表
function renderHotProducts() {
    const hotProductsList = document.getElementById('hotProductsList');
    if (!hotProductsList) return;
    
    hotProductsList.innerHTML = '';
    
    hotProducts.forEach(product => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <div>
                <i class="fas fa-mobile-alt me-2 text-primary"></i>
                <span>${product.name}</span>
            </div>
            <div class="d-flex align-items-center">
                <span class="badge bg-danger rounded-pill me-2">${product.sales}</span>
                <small class="text-muted">${product.time}</small>
            </div>
        `;
        li.addEventListener('click', () => {
            window.location.href = `product-detail.html?id=${product.id}`;
        });
        hotProductsList.appendChild(li);
    });
}

// 销售趋势图
function initSalesTrendChart() {
    const chartElement = document.getElementById('salesTrendChart');
    if (!chartElement) return;
    
    const chart = echarts.init(chartElement);
    
    const option = {
        tooltip: {
            trigger: 'axis',
            formatter: '{b}<br/>{a0}: {c0}件<br/>{a1}: {c1}件<br/>{a2}: {c2}件'
        },
        legend: {
            data: ['氮化镓充电器', 'Type-C扩展坞', '蓝牙耳机'],
            textStyle: {
                color: '#666'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月'],
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            },
            axisLabel: {
                color: '#666'
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            },
            axisLabel: {
                color: '#666'
            },
            splitLine: {
                lineStyle: {
                    color: '#eee'
                }
            }
        },
        series: [
            {
                name: '氮化镓充电器',
                type: 'line',
                data: hotProducts[0].salesData,
                smooth: true,
                lineStyle: {
                    width: 3,
                    color: '#4e79a7'
                },
                itemStyle: {
                    color: '#4e79a7'
                },
                symbolSize: 8,
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(78, 121, 167, 0.3)' },
                        { offset: 1, color: 'rgba(78, 121, 167, 0.1)' }
                    ])
                }
            },
            {
                name: 'Type-C扩展坞',
                type: 'line',
                data: hotProducts[1].salesData,
                smooth: true,
                lineStyle: {
                    width: 3,
                    color: '#f28e2b'
                },
                itemStyle: {
                    color: '#f28e2b'
                },
                symbolSize: 8,
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(242, 142, 43, 0.3)' },
                        { offset: 1, color: 'rgba(242, 142, 43, 0.1)' }
                    ])
                }
            },
            {
                name: '蓝牙耳机',
                type: 'line',
                data: hotProducts[2].salesData,
                smooth: true,
                lineStyle: {
                    width: 3,
                    color: '#e15759'
                },
                itemStyle: {
                    color: '#e15759'
                },
                symbolSize: 8,
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(225, 87, 89, 0.3)' },
                        { offset: 1, color: 'rgba(225, 87, 89, 0.1)' }
                    ])
                }
            }
        ]
    };
    
    chart.setOption(option);
    
    window.addEventListener('resize', function() {
        chart.resize();
    });
}

// 销售占比饼图
function initSalesPieChart() {
    const chartElement = document.getElementById('salesPieChart');
    if (!chartElement) return;
    
    const chart = echarts.init(chartElement);
    
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            right: 10,
            top: 'center',
            textStyle: {
                color: '#666'
            }
        },
        series: [
            {
                name: '销售占比',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center',
                    formatter: '{b}: {d}%'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '18',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: hotProducts[0].totalSales, name: '氮化镓充电器', itemStyle: { color: '#4e79a7' } },
                    { value: hotProducts[1].totalSales, name: 'Type-C扩展坞', itemStyle: { color: '#f28e2b' } },
                    { value: hotProducts[2].totalSales, name: '蓝牙耳机', itemStyle: { color: '#e15759' } }
                ]
            }
        ]
    };
    
    chart.setOption(option);
    
    window.addEventListener('resize', function() {
        chart.resize();
    });
}

// 1.4 jQuery特效
function initJQueryEffects() {
    // 平滑滚动
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this).attr('href');
        if (target === '#') return;
        
        $('html, body').animate({
            scrollTop: $(target).offset().top - 70
        }, 500, 'swing');
    });
    
    // 组织机构树形菜单点击效果
    $('.org-tree li span').on('click', function() {
        const $ul = $(this).parent().children('ul');
        if ($ul.length) {
            $ul.slideToggle();
            $(this).find('i').toggleClass('fa-plus-square fa-minus-square');
        }
    });
    
    // 表单验证提示
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        const email = $(this).find('input[type="email"]').val();
        if (!email.includes('@')) {
            alert('请输入有效的电子邮件地址');
            return;
        }
        
        // 模拟提交成功
        alert('感谢您的留言！我们会尽快与您联系。');
        $(this).trigger('reset');
    });
    
    // 产品卡片悬停效果
    $('.product-card').hover(
        function() {
            $(this).css({
                'transform': 'translateY(-5px)',
                'box-shadow': '0 10px 20px rgba(0,0,0,0.1)'
            });
        },
        function() {
            $(this).css({
                'transform': '',
                'box-shadow': '0 2px 10px rgba(0,0,0,0.05)'
            });
        }
    );
}

// 1.5 动态效果和提示
function initDynamicEffects() {
    // 新闻卡片悬停效果
    document.querySelectorAll('.news-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
        });
    });
    
    // 表单提交提示
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('感谢您的提交！我们会尽快与您联系。');
            this.reset();
        });
    });
    
    // 1.3.4 组织机构树形展开
    const orgItems = document.querySelectorAll('.org-tree li');
    orgItems.forEach(item => {
        const span = item.querySelector('span');
        if (span && item.querySelector('ul')) {
            span.style.cursor = 'pointer';
            const icon = document.createElement('i');
            icon.className = 'fas fa-plus-square ms-2';
            span.appendChild(icon);
            
            span.addEventListener('click', function() {
                const ul = this.parentElement.querySelector('ul');
                if (ul) {
                    ul.style.display = ul.style.display === 'none' ? 'block' : 'none';
                    const icon = this.querySelector('i');
                    if (icon) {
                        icon.classList.toggle('fa-plus-square');
                        icon.classList.toggle('fa-minus-square');
                    }
                }
            });
            
            // 默认折叠
            const ul = item.querySelector('ul');
            if (ul) {
                ul.style.display = 'none';
            }
        }
    });
    
    // 页面加载动画
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
}