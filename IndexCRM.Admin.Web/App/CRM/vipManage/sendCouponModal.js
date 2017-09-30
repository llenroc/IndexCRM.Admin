﻿(function () {
    appModule.controller('crm.vipManage.sendCouponModal', [
        "$scope", "$uibModalInstance", "$timeout", "$uibModal", "abp.services.app.coupon", 'vipInfo',
        function ($scope, $uibModalInstance, $timeout, $uibModal, couponService, vipInfo) {

            var vm = this;
            vm.saving = false;

            vm.vipId = vipInfo.vipId;
            vm.vipName = vipInfo.vipName;
            vm.vipPoint = vipInfo.vipPoint;
            vm.Explain = "后台处理";
            vm.couponConfigList = null;

            vm.save = function () {
                if (vm.amount == 0) {
                    abp.notify.warn("修改数量不能为零");
                    return;
                }
                vm.saving = true;

                abp.message.confirm(
                    abp.utils.formatString("修改会员积分\n\r\n\r会员昵称:{0}\n\r修改数量:{1}  ", vm.vipName, vm.amount),
                    function (isConfirmed) {
                        $timeout(function () {
                            if (isConfirmed) {
                                vm.saving = true;
                                pointService.changePoint({
                                    vipId: vm.vipId,
                                    amount: vm.amount,
                                    explain: vm.Explain
                                }).then(function () {
                                    abp.notify.success("操作成功");
                                    $uibModalInstance.close();
                                }).finally(function () {
                                    vm.saving = false;
                                });
                            }
                        }, 200);
                    }
                );


            };

            vm.cancel = function () {
                $uibModalInstance.dismiss();
            };

            vm.getCouponConfigList = function () {
                couponService.getCouponConfigList()
                    .then(function (result) {
                        vm.couponConfigList = result.data;
                        vm.couponConfigList.unshift({ id: "", couponName: "请选择" });
                        console.log(vm.couponConfigList);
                    }).finally(function () {
                        vm.loading = false;
                    });
            }

            vm.getCouponConfigList();

        }
    ]);
})();